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
3. Create a Blob store (**Storage → Blob**) and add these env vars (all environments):
   - `BLOB_READ_WRITE_TOKEN` = your Blob token
   - `OWNER_PASSCODE` = the password only you will use to log in
   - `SESSION_SECRET` = any long random string (signs the login cookie)
   - `CRON_SECRET` = (optional) random string that protects the cleanup route
4. Deploy.

> After deploy, open `/api/auth` → it should show `"passcodeConfigured": true`, and
> `/api/upload` → `"tokenConfigured": true`.

## Login & ownership

- **Only the owner can upload or change the library.** Visiting the bare app shows a
  passcode screen; enter `OWNER_PASSCODE` to unlock the studio.
- **Visitors never log in.** Anyone opening a share link (`?lib=…` or `?model=…`) sees
  the viewer immediately, with the download-to-cache option.
- **The library lives on the server**, so after logging in on any device you see the
  same assets — ready to load, view, or re-share.
- Uploads use the secure client-upload handshake; `/api/upload` rejects anyone who is
  not logged in, so randoms can't push files to your Blob store.

## Fixing "Failed to retrieve the client token"

This means the browser called `/api/upload` but the server could not mint a token —
almost always because **`BLOB_READ_WRITE_TOKEN` is not set**, or the `api/` folder
was not deployed.

1. Open `https://<your-app>.vercel.app/api/upload` in a browser. It returns JSON:
   - `"tokenConfigured": true`  → token is set, uploads should work.
   - `"tokenConfigured": false` → add the env var below and **redeploy**.
2. Vercel → Settings → Environment Variables → add `BLOB_READ_WRITE_TOKEN` (from
   Storage → Blob), apply to Production, then redeploy.

## Two ways to share

- **Share (24h link)** — the ↗ button on a loaded asset. Same as the old app: a
  passport card with QR and a live `AUTO-DESTRUCT HH:MM:SS` countdown. The link
  carries `?model=…&exp=…`; once 24h pass it shows **EXPIRED** to the recipient.
- **Share whole library (offline cache)** — bundles every asset into one manifest;
  the recipient downloads all assets once and then plays from cache offline.

> Library assets you keep are permanent. The 24h on a single-asset link is a
> client-enforced countdown (the asset stays in your library so you can re-share).

## Auto-delete (cleanup cron)

`/api/cron` runs daily and deletes blobs older than 24h **that are not part of your
library**, so it never breaks saved assets:

- assets in your library, and the library index → kept forever
- old shared-library manifests (`?lib=` links) → deleted, so those links expire
- assets you removed from the library → deleted (storage cleanup)

Tune with env vars: `CRON_MAX_AGE_HOURS` (default 24) and `CRON_SECRET` (recommended).
On the Hobby plan crons run only once per day and up to ~59 min late, so effective
lifetime is ~24-48h. For exact timing, use Vercel Pro or point an external scheduler
(e.g. cron-job.org, with the `Authorization: Bearer <CRON_SECRET>` header) at
`/api/cron`.



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

- `index.html` — the app (login, studio, viewer, share, cache control)
- `sw.js` — service worker: cache-first assets + batch precache with progress
- `api/upload.js` — secure Vercel Blob client-upload token route (login required)
- `api/auth.js` — owner passcode login / logout / status
- `api/library.js` — load & save the owner's library (login required)
- `api/cron.js` — daily cleanup of stale, unreferenced blobs
- `api/_lib/*.js` — shared auth + body helpers (not routes)
- `vercel.json` — service-worker headers
- `package.json` — `@vercel/blob` dependency

Built on Google `<model-viewer>`. Original concept by WolfPupLabs.
