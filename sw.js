const CACHE_NAME = 'mega4-pwa-v44';
const APP_FILES = [
  "./K1_btn.png?v=44",
  "./K2_btn.png?v=44",
  "./K3_btn.png?v=44",
  "./K4_btn.png?v=44",
  "./K5_btn.png?v=44",
  "./K6_btn.png?v=44",
  "./K7_btn.png?v=44",
  "./L13.png?v=44",
  "./L14.png?v=44",
  "./L15.png?v=44",
  "./L16.png?v=44",
  "./L17.png?v=44",
  "./L18.png?v=44",
  "./L20.png?v=44",
  "./L21.png?v=44",
  "./L21B.png?v=44",
  "./L22.png?v=44",
  "./L26.png?v=44",
  "./L27.png?v=44",
  "./apple-touch-icon.png?v=44",
  "./asset01.png?v=44",
  "./asset02.png?v=44",
  "./asset03.png?v=44",
  "./asset04.m4a?v=44",
  "./asset05.m4a?v=44",
  "./asset06.m4a?v=44",
  "./asset07.m4a?v=44",
  "./asset08.m4a?v=44",
  "./asset09.m4a?v=44",
  "./audio01.m4a?v=44",
  "./audio02.m4a?v=44",
  "./audio03.m4a?v=44",
  "./balance.png?v=44",
  "./bg.png?v=44",
  "./dial.png?v=44",
  "./gmt_l.png?v=44",
  "./gmt_r.png?v=44",
  "./h24.png?v=44",
  "./hourHand.png?v=44",
  "./icon-192.png?v=44",
  "./icon-512.png?v=44",
  "./index.html?v=44",
  "./infoOverlay.png?v=44",
  "./leap.png?v=44",
  "./m_light.html?v=44",
  "./manifest.webmanifest?v=44",
  "./minuteHand.png?v=44",
  "./moon.png?v=44",
  "./pinion1.png?v=44",
  "./pinion2.png?v=44",
  "./sec_wheel2.png?v=44",
  "./tourb_cage.png?v=44"
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return resp;
    }).catch(() => caches.match(req))
  );
});
