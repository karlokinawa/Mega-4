
const CACHE_NAME = 'mega4-pwa-v219';
const PRECACHE_URLS = [
  "K1_btn.png",
  "K2_btn.png",
  "K3_btn.png",
  "K4_btn.png",
  "K5_btn.png",
  "K6_btn.png",
  "K7_btn.png",
  "L13.png",
  "L15.png",
  "L17.png",
  "L18.png",
  "L21.png",
  "L21B.png",
  "L26.png",
  "L27.png",
  "apple-touch-icon.png?v=218",
  "asset_m4a.m4a",
  "asset_m4a_2.m4a",
  "asset_m4a_3.m4a",
  "asset_m4a_4.m4a",
  "balance.png",
  "bg.png",
  "clickSoft.m4a",
  "crown_over_top.png",
  "crown_overlay.png",
  "dial.png",
  "gmt_l.png",
  "gmt_r.png",
  "h24.png",
  "hourHand.png",
  "icon-192.png?v=218",
  "icon-512.png?v=218",
  "index.html?v=218",
  "infoOverlay.png",
  "m_light.html?v=218",
  "manifest.webmanifest?v=218",
  "minuteHand.png",
  "moon.png",
  "overlay_info_de.png",
  "overlay_info_jp.png",
  "pinion1.png",
  "pinion2.png",
  "sec_wheel2.png",
  "tickAudio.m4a",
  "tourb_cage.png",
  "turb_unterrad.png"
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => {
      if (key !== CACHE_NAME && key.startsWith('mega4-pwa-v')) {
        return caches.delete(key);
      }
    }));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith((async () => {
    const cached = await caches.match(req, {ignoreSearch:false});
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (err) {
      const fallback = await caches.match(req.url.split('?')[0], {ignoreSearch:true});
      if (fallback) return fallback;
      throw err;
    }
  })());
});
