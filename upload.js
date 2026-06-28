// /api/upload  —  Secure client-upload handshake for Vercel Blob.
//
// The browser NEVER sees your BLOB_READ_WRITE_TOKEN. Instead it asks this route
// for a short-lived client token (handleUpload), then streams the file straight
// to blob storage. Works for files up to 5 TB and keeps the secret on the server.
//
// Required env var (Vercel dashboard -> Settings -> Environment Variables):
//   BLOB_READ_WRITE_TOKEN = <your token from Storage > Blob>
//
// Reads the token automatically from process.env. Do not hard-code it here.

import { handleUpload } from '@vercel/blob/client';

export const config = { runtime: 'edge' };

const ALLOWED = [
  'model/gltf-binary', // .glb
  'model/gltf+json', // .gltf
  'application/octet-stream', // some browsers send this for .glb/.usdz
  'model/vnd.usdz+zip', // .usdz
  'model/vnd.pixar.usd', // .usdz alt
  'application/zip', // .usdz alt
  'application/json', // library manifest
  'image/png',
  'image/jpeg',
  'image/webp',
];

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid body' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (/* pathname, clientPayload */) => ({
        allowedContentTypes: ALLOWED,
        addRandomSuffix: true,
        maximumSizeInBytes: 250 * 1024 * 1024, // 250 MB ceiling per asset
      }),
      // Fires after the browser finishes uploading. No DB writes here on purpose
      // — the library manifest lives in a blob, so there is nothing to persist.
      onUploadCompleted: async () => {},
    });

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error?.message || 'Upload failed' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }
}
