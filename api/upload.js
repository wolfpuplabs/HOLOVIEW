// /api/upload  —  Secure client-upload handshake for Vercel Blob.
//
// Runs on the Node.js runtime (NOT edge): handleUpload needs Node modules
// (crypto, stream...) that the Edge runtime does not support.
//
// The browser never sees your BLOB_READ_WRITE_TOKEN. It asks this route for a
// short-lived client token, then streams the file straight to blob storage.
//
// REQUIRED env var (Vercel -> Settings -> Environment Variables, then redeploy):
//   BLOB_READ_WRITE_TOKEN = <token from Storage > Blob>
//
// Health check: open  /api/upload  in a browser (GET). "tokenConfigured": true
// means uploads should work; false means set the env var and redeploy.

import { handleUpload } from '@vercel/blob/client';
import { isAuthed } from './_lib/auth.js';
import { ensureBlobToken } from './_lib/blob.js';

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

export default async function handler(req, res) {
  // --- Health check ---------------------------------------------------------
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      route: '/api/upload',
      runtime: 'nodejs',
      tokenConfigured: ensureBlobToken(),
      hint: process.env.BLOB_READ_WRITE_TOKEN
        ? 'Token present. Uploads should work.'
        : 'Set BLOB_READ_WRITE_TOKEN in Vercel and redeploy.',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Only the logged-in owner may mint upload tokens.
  if (!isAuthed(req)) {
    return res.status(401).json({ error: 'Login required to upload' });
  }

  if (!ensureBlobToken()) {
    return res.status(500).json({
      error: 'Server is missing a Blob token. Connect a Blob store / set BLOB_READ_WRITE_TOKEN, then redeploy.',
    });
  }

  // Vercel's Node runtime usually parses JSON into req.body. Fall back to reading
  // the raw stream so the handshake never hangs if parsing is off.
  let body = req.body;
  if (body == null || (typeof body === 'string' && body.length === 0)) {
    try {
      const chunks = [];
      for await (const c of req) chunks.push(typeof c === 'string' ? Buffer.from(c) : c);
      const raw = Buffer.concat(chunks).toString('utf8');
      body = raw ? JSON.parse(raw) : {};
    } catch { return res.status(400).json({ error: 'Invalid body' }); }
  } else if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid body' }); }
  }

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (/* pathname, clientPayload */) => ({
        allowedContentTypes: ALLOWED,
        addRandomSuffix: true,
        maximumSizeInBytes: 250 * 1024 * 1024, // 250 MB per asset
      }),
      // Library manifest lives in a blob, so there is no DB to update here.
      onUploadCompleted: async () => {},
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error?.message || 'Upload handshake failed' });
  }
}
