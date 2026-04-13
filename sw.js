const CACHE_NAME = 'mega4-pwa-v11-true-light';
const APP_FILES = [
  "a01.m4a",
  "a02.m4a",
  "a03.m4a",
  "a04.m4a",
  "a05.m4a",
  "a06.m4a",
  "a07.m4a",
  "ch_hour.png",
  "chrono_min.png",
  "clickHeavy.m4a",
  "clickSoft.m4a",
  "eq_time.png",
  "file_list.txt",
  "gmt_l.png",
  "gmt_l_sub.png",
  "gmt_r.png",
  "gmt_r_sub.png",
  "h24.png",
  "i01.png",
  "i02.png",
  "i03.png",
  "i04.png",
  "i06.png",
  "i07.png",
  "i08.png",
  "i09.png",
  "i10.png",
  "i13.png",
  "i14.png",
  "i15.png",
  "i16.png",
  "i17.png",
  "i18.png",
  "i19.png",
  "i20.png",
  "index.html",
  "leap.png",
  "manifest.webmanifest",
  "overlay_arrow.png",
  "overlay_de.png",
  "overlay_glitter.png",
  "overlay_info.png",
  "overlay_jp.png",
  "p01.png",
  "p02.webp",
  "p03.webp",
  "p04.webp",
  "p05.webp",
  "sw.js",
  "u09.html"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
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
