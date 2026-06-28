// /api/library — the owner's library, stored on the server so it follows you
// across devices. Login required for both read and write.
//
// GET  /api/library              -> { name, assets: [...] }
// POST /api/library { name, assets } -> saves (overwrites) the library index

import { list, put } from '@vercel/blob';
import { isAuthed, libraryKey } from './_lib/auth.js';
import { ensureBlobToken } from './_lib/blob.js';
import { readJson } from './_lib/http.js';

export default async function handler(req, res) {
  if (!isAuthed(req)) return res.status(401).json({ error: 'Login required' });
  if (!ensureBlobToken()) {
    return res.status(500).json({ error: 'No Blob token on the server.' });
  }

  const KEY = libraryKey();

  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: KEY, limit: 1 });
      if (!blobs.length) return res.status(200).json({ name: 'My library', assets: [] });
      const r = await fetch(blobs[0].url, { cache: 'no-store' });
      const data = await r.json();
      return res.status(200).json({ name: data.name || 'My library', assets: Array.isArray(data.assets) ? data.assets : [] });
    } catch {
      return res.status(200).json({ name: 'My library', assets: [] });
    }
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    const body = await readJson(req);
    if (!body) return res.status(400).json({ error: 'Invalid body' });
    try {
      const json = JSON.stringify({
        name: body.name || 'My library',
        assets: Array.isArray(body.assets) ? body.assets : [],
        updatedAt: Date.now(),
      });
      await put(KEY, json, {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 0,
      });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(400).json({ error: e?.message || 'Save failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
