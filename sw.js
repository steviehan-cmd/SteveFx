// SteveFx service worker: serves the app from cache so it opens offline.
// Bump VERSION when you change files, so phones pick up the update.
const VERSION = 'stevefx-v5';
const ASSETS = ['./', './index.html', './manifest.json', './icons/icon-180.png', './icons/icon-192.png', './icons/icon-512.png'];

// Install: download every file fresh from the server (cache: 'reload' skips the
// browser's own short-term cache, so an update never re-saves the old version).
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});

// App files: answer from cache instantly, refresh the cache in the background.
// Rate API calls (other domains) go straight to the network; the app saves rates itself.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const cached = await cache.match(e.request, { ignoreSearch: true });
    const network = fetch(e.request.url, { cache: 'no-cache' }).then(res => {
      if (res.ok) cache.put(e.request, res.clone());
      return res;
    }).catch(() => cached);
    return cached || network;
  }));
});
