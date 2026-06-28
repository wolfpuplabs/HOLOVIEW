// /api/cron — daily housekeeping (Hobby plan = once per day).
//
// Deletes blobs older than CRON_MAX_AGE_HOURS (default 24h) that are NOT part of
// your saved library. This gives you the old "auto-destruct" feel WITHOUT ever
// touching assets you chose to keep:
//   • assets currently in your library            -> KEPT forever
//   • the library index file                      -> KEPT forever
//   • old shared-library manifests (?lib= links)  -> deleted  (link expires)
//   • assets you removed from the library         -> deleted  (cleanup)
//
// Because Hobby crons run only once a day (and up to ~59 min late), effective
// lifetime is ~24-48h. For exact 24h, use Pro or an external scheduler
// (e.g. cron-job.org) hitting this same route with the Authorization header.
//
// Optional env: CRON_SECRET (recommended), CRON_MAX_AGE_HOURS (default 24).

import { list, del } from '@vercel/blob';
import { libraryKey } from './_lib/auth.js';
import { ensureBlobToken } from './_lib/blob.js';

export default async function handler(req, res) {
  // If CRON_SECRET is set, require it (Vercel sends it as a Bearer token).
  const secret = process.env.CRON_SECRET;
  if (secret) {
    if ((req.headers.authorization || '') !== `Bearer ${secret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
  if (!ensureBlobToken()) {
    return res.status(500).json({ error: 'No Blob token on the server.' });
  }

  const maxAgeMs = Number(process.env.CRON_MAX_AGE_HOURS || 24) * 3600 * 1000;
  const indexKey = libraryKey();

  // Build the keep-set from the current library (asset URLs we must never delete).
  const keep = new Set();
  try {
    const { blobs } = await list({ prefix: indexKey, limit: 1 });
    if (blobs.length) {
      const data = await (await fetch(blobs[0].url, { cache: 'no-store' })).json();
      for (const a of data.assets || []) {
        if (a.glb) keep.add(a.glb);
        if (a.usdz) keep.add(a.usdz);
      }
    }
  } catch { /* if the library can't be read, fail safe by deleting nothing referenced */ }

  const now = Date.now();
  const toDelete = [];
  let checked = 0, kept = 0, cursor;

  do {
    const page = await list({ cursor, limit: 1000 });
    for (const b of page.blobs) {
      checked++;
      if (b.pathname === indexKey || keep.has(b.url)) { kept++; continue; }
      const age = now - new Date(b.uploadedAt).getTime();
      if (age > maxAgeMs) toDelete.push(b.url); else kept++;
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  let deleted = 0;
  for (let i = 0; i < toDelete.length; i += 100) {
    try { await del(toDelete.slice(i, i + 100)); deleted += Math.min(100, toDelete.length - i); }
    catch (e) { /* keep going */ }
  }

  return res.status(200).json({ ok: true, checked, kept, deleted, maxAgeHours: maxAgeMs / 3600000 });
}
