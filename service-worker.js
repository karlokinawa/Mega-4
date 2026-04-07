const CACHE_NAME = 'u147-pwa-root-v2';
const CORE = [
  "./",
  "./audio_01.m4a",
  "./audio_02.m4a",
  "./audio_03.m4a",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./img_01.webp",
  "./img_02.webp",
  "./img_03.webp",
  "./img_04.webp",
  "./img_05.webp",
  "./img_06.webp",
  "./img_07.webp",
  "./img_08.webp",
  "./img_09.webp",
  "./img_10.webp",
  "./img_11.webp",
  "./img_12.webp",
  "./img_13.webp",
  "./img_14.webp",
  "./img_15.webp",
  "./img_16.webp",
  "./img_17.webp",
  "./img_18.webp",
  "./img_19.webp",
  "./img_20.webp",
  "./img_21.webp",
  "./img_22.webp",
  "./img_23.webp",
  "./img_24.webp",
  "./img_25.webp",
  "./img_26.webp",
  "./img_27.webp",
  "./img_28.webp",
  "./img_29.webp",
  "./img_30.webp",
  "./index.html",
  "./manifest.json"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return resp;
    }))
  );
});
