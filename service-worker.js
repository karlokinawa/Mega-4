const CACHE_NAME = 'uhr-chime-v120-root-pwa-v2';
const APP_SHELL = [
  "./L13.webp",
  "./L15.webp",
  "./L17.webp",
  "./L18.webp",
  "./L21.webp",
  "./L21B.webp",
  "./L26.webp",
  "./L27.webp",
  "./balance.webp",
  "./bg.webp",
  "./clickSoft.m4a",
  "./dial.webp",
  "./gmt_l.webp",
  "./gmt_r.webp",
  "./h24.webp",
  "./hourHand.webp",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./index.html",
  "./infoOverlay.webp",
  "./infoOverlay_de.webp",
  "./infoOverlay_jp.webp",
  "./manifest.json",
  "./minuteHand.webp",
  "./moon.webp",
  "./original_watch_case.jpeg",
  "./pinion1.webp",
  "./pinion2.webp",
  "./sec_wheel2.webp",
  "./tickAudio.m4a",
  "./tourb_cage.webp",
  "./v120_ios_zoom_guard.original.html"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return resp;
    }).catch(() => cached))
  );
});
