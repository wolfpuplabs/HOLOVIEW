/* HOLOVIEW Service Worker
 * Goal: download library assets ONCE, then serve every later request from the
 * local cache. This removes repeated downloads of heavy .glb/.usdz files and
 * keeps traffic to the blob store close to zero after the first sync.
 *
 * Strategy:
 *  - APP_CACHE  : the shell (index.html, fonts, libs) -> stale-while-revalidate
 *  - ASSET_CACHE: 3D models / thumbnails / manifests  -> cache-first, forever
 *  - A message API lets the page pre-download a whole library and report progress.
 */

const VERSION = 'holoview-v1';
const APP_CACHE = `${VERSION}-app`;
const ASSET_CACHE = `${VERSION}-assets`;

// Hosts whose responses we treat as cacheable spatial assets.
const ASSET_HOST_HINTS = ['blob.vercel-storage.com', 'vercel-storage.com'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Drop caches from older versions.
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.startsWith(VERSION))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

function isAssetRequest(url) {
  // A request is an "asset" if it points at the blob store, OR if it is already
  // sitting in the asset cache (covers custom domains / proxied blobs).
  if (ASSET_HOST_HINTS.some((h) => url.hostname.endsWith(h))) return true;
  return /\.(glb|gltf|usdz|bin|png|jpe?g|webp|ktx2|hdr)(\?|$)/i.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }

  // 1) Spatial assets -> cache-first (the whole point of the project).
  if (isAssetRequest(url)) {
    event.respondWith(cacheFirst(req, ASSET_CACHE));
    return;
  }

  // 2) Same-origin shell -> stale-while-revalidate so updates still land.
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(req, APP_CACHE));
  }
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request, { ignoreVary: true, ignoreSearch: false });
  if (hit) return hit;
  try {
    const res = await fetch(request, { mode: 'cors', credentials: 'omit' });
    if (res && (res.ok || res.type === 'opaque')) {
      cache.put(request, res.clone()).catch(() => {});
    }
    return res;
  } catch (err) {
    // Last resort: try an opaque no-cors fetch so AR/WebGL can still render.
    try {
      return await fetch(request, { mode: 'no-cors' });
    } catch {
      return new Response('Asset unavailable offline', { status: 504 });
    }
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone()).catch(() => {});
      return res;
    })
    .catch(() => null);
  return hit || (await network) || new Response('Offline', { status: 503 });
}

/* ----------------------------- Message API ----------------------------- */

self.addEventListener('message', (event) => {
  const data = event.data || {};
  const reply = (msg) => {
    if (event.source) event.source.postMessage(msg);
  };

  if (data.type === 'PRECACHE_LIBRARY') {
    precacheLibrary(data.urls || [], data.libId || 'default', reply);
  } else if (data.type === 'CACHE_STATUS') {
    cacheStatus(data.urls || []).then((cached) =>
      reply({ type: 'CACHE_STATUS_RESULT', libId: data.libId, cached })
    );
  } else if (data.type === 'CLEAR_LIBRARY') {
    clearAssets(data.urls).then(() =>
      reply({ type: 'LIBRARY_CLEARED', libId: data.libId })
    );
  }
});

async function precacheLibrary(urls, libId, reply) {
  const cache = await caches.open(ASSET_CACHE);
  const total = urls.length;
  let loaded = 0;
  let bytes = 0;

  for (const url of urls) {
    try {
      const already = await cache.match(url, { ignoreSearch: false });
      if (already) {
        const len = Number(already.headers.get('content-length')) || 0;
        bytes += len;
      } else {
        const res = await fetch(url, { mode: 'cors', credentials: 'omit' });
        if (res && (res.ok || res.type === 'opaque')) {
          const clone = res.clone();
          await cache.put(url, res);
          const len = Number(clone.headers.get('content-length')) || 0;
          bytes += len;
        }
      }
    } catch (err) {
      reply({ type: 'PRECACHE_ERROR', libId, url, message: String(err) });
    }
    loaded += 1;
    reply({ type: 'PRECACHE_PROGRESS', libId, loaded, total, bytes, url });
  }

  reply({ type: 'PRECACHE_DONE', libId, total, bytes });
}

async function cacheStatus(urls) {
  const cache = await caches.open(ASSET_CACHE);
  const result = {};
  for (const url of urls) {
    const hit = await cache.match(url, { ignoreSearch: false });
    result[url] = !!hit;
  }
  return result;
}

async function clearAssets(urls) {
  const cache = await caches.open(ASSET_CACHE);
  if (Array.isArray(urls) && urls.length) {
    await Promise.all(urls.map((u) => cache.delete(u)));
  } else {
    await caches.delete(ASSET_CACHE);
  }
}
