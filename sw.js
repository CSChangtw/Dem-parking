/* 乾拌砂漿粉體緻密堆積模擬 — Service Worker
   更新程式時請遞增 VERSION，使用者端即會出現「重新載入」提示。 */
const VERSION = 'dem-pack-v1.0.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.ico',
  './favicon-32.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // 頁面：網路優先（取得新版），離線時改用快取
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const cp = res.clone();
        caches.open(VERSION).then((c) => c.put('./index.html', cp));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }
  // 其他資源：快取優先
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const cp = res.clone();
      caches.open(VERSION).then((c) => c.put(req, cp));
      return res;
    }))
  );
});
