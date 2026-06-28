// /api/upload  —  Secure client-upload handshake for Vercel Blob.
//
// The browser NEVER sees your BLOB_READ_WRITE_TOKEN. It asks this route for a
// short-lived client token (handleUpload), then streams the file straight to
// blob storage. Keeps the secret on the server, supports files up to 5 TB.
//
// REQUIRED env var (Vercel -> Settings -> Environment Variables, then redeploy):
//   BLOB_READ_WRITE_TOKEN = <token from Storage > Blob>
//
// Health check: open  /api/upload  in a browser (GET). It tells you whether the
// token is configured WITHOUT leaking it. If "tokenConfigured": false -> set the
// env var and redeploy.

import { handleUpload } from '@vercel/blob/client';

export const config = { runtime: 'edge' };

const ALLOWED = [
  'model/gltf-binary',        // .glb
  'model/gltf+json',          // .gltf
  'application/octet-stream', // some browsers send this for .glb/.usdz
  'model/vnd.usdz+zip',       // .usdz
  'model/vnd.pixar.usd',      // .usdz alt
  'application/zip',          // .usdz alt
  'application/json',         // library manifest
  'image/png',
  'image/jpeg',
  'image/webp',
];

export default async function handler(request) {
  // --- Health check ---------------------------------------------------------
  if (request.method === 'GET') {
    return json({
      ok: true,
      route: '/api/upload',
      tokenConfigured: !!process.env.BLOB_READ_WRITE_TOKEN,
      hint: process.env.BLOB_READ_WRITE_TOKEN
        ? 'Token present. Uploads should work.'
        : 'Set BLOB_READ_WRITE_TOKEN in Vercel and redeploy.',
    });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return json(
      { error: 'Server is missing BLOB_READ_WRITE_TOKEN. Set it in Vercel env vars and redeploy.' },
      500
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (/* pathname, clientPayload */) => ({
        allowedContentTypes: ALLOWED,
        addRandomSuffix: true,
        maximumSizeInBytes: 250 * 1024 * 1024, // 250 MB per asset
      }),
      // Library manifest lives in a blob, so there is no DB to update here.
      onUploadCompleted: async () => {},
    });
    return json(result, 200);
  } catch (error) {
    return json({ error: error?.message || 'Upload handshake failed' }, 400);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}
