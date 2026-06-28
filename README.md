# HOLOVIEW — Spatial Asset Library & AR Viewer

Upload 3D assets (`.glb` / `.usdz`), keep them in a **persistent library**, view them
on a spatial holo-stage with AR, and share the **whole library** with one link. When a
recipient opens that link they **download every asset once**, after which everything
plays from the local cache — no repeated downloads, near-zero traffic to storage.

## What changed in 2.0

- **New spatial UI/UX** — volumetric grid floor, depth parallax, a "materialize"
  scan-sweep when an asset loads, plus optional **spatial sound effects** (Web Audio,
  panned left/right). Respects `prefers-reduced-motion` and has a mute toggle.
- **Persistent library** — assets are saved on the device with IndexedDB instead of
  being one-shot uploads. Pick any asset from the grid to load it.
- **Share a whole library** — the library is packaged into one small JSON manifest
  (thumbnails embedded) and shared as a link / QR.
- **Download-once, play-from-cache** — a Service Worker (`sw.js`) caches assets the
  first time and serves every later request from disk. Shared libraries get a
  "Download library to this device" button with a progress bar; after that the assets
  work offline and never hit the network again.
- **Security fix** — the Blob token is no longer in the browser. Uploads now use the
  official client-upload handshake through `/api/upload`, so the secret stays on the server.

## Deploy (Vercel + GitHub)

1. Push these files to a GitHub repo.
2. Import the repo in Vercel.
3. Create a Blob store (**Storage → Blob**) and add the env var:
   - `BLOB_READ_WRITE_TOKEN` = your token
4. Deploy.

> Local dev: `npm i` then `vercel dev` (uploads need the env var; pull it with `vercel env pull`).

## ⚠️ Revoke your old token

The previous version had a Blob read/write token hard-coded in `index.html`, so it is
permanently in your Git history and must be considered compromised. **Roll it / delete it**
in the Vercel dashboard and generate a fresh one for `BLOB_READ_WRITE_TOKEN`.

## How caching reduces traffic

- `ASSET_CACHE` (cache-first): `.glb` / `.usdz` / thumbnails are fetched once, then
  served from the device forever.
- The library manifest is a single static JSON blob, so there is **no database** and
  nothing to query on each view.
- Opening a shared library downloads all assets in one batch; replays and AR previews
  read from cache.

### Honest limitation
The in-browser WebGL preview and repeat browsing are fully cached. But **iOS AR Quick
Look** downloads the `.usdz` natively through the OS, outside the page, so the final
"launch AR" step on iPhone/iPad still fetches from the network. Caching covers
everything else.

## Files

- `index.html` — the app (UI, library, viewer, share, cache control)
- `sw.js` — service worker: cache-first assets + batch precache with progress
- `api/upload.js` — secure Vercel Blob client-upload token route (Edge)
- `vercel.json` — service-worker headers
- `package.json` — `@vercel/blob` dependency

Built on Google `<model-viewer>`. Original concept by WolfPupLabs.
