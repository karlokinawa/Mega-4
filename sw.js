const CACHE_NAME = 'mega4-pwa-v42';
const APP_FILES = [
  "./K1_btn.png",
  "./K2_btn.png",
  "./K3_btn.png",
  "./K4_btn.png",
  "./K5_btn.png",
  "./K6_btn.png",
  "./K7_btn.png",
  "./L13.png",
  "./L14.png",
  "./L15.png",
  "./L16.png",
  "./L17.png",
  "./L18.png",
  "./L20.png",
  "./L21.png",
  "./L21B.png",
  "./L22.png",
  "./L26.png",
  "./L27.png",
  "./audio01.m4a",
  "./audio02.m4a",
  "./audio03.m4a",
  "./audio04.m4a",
  "./audio05.m4a",
  "./audio06.m4a",
  "./audio07.m4a",
  "./audio08.m4a",
  "./audio09.m4a",
  "./balance.png",
  "./bg.png",
  "./dial.png",
  "./gmt_l.png",
  "./gmt_r.png",
  "./h24.png",
  "./hourHand.png",
  "./img01.png",
  "./img02.png",
  "./img03.png",
  "./index.html",
  "./infoOverlay.png",
  "./leap.png",
  "./m_light.html",
  "./manifest.webmanifest",
  "./minuteHand.png",
  "./moon.png",
  "./pinion1.png",
  "./pinion2.png",
  "./sec_wheel2.png",
  "./tourb_cage.png"
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
