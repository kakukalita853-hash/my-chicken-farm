const CACHE_NAME = 'my-chicken-farm-v8-edit-report';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Never cache Apps Script API responses or Google requests containing session tokens.
  if (req.url.includes('script.google.com') || req.url.includes('googleusercontent.com')) {
    event.respondWith(fetch(req));
    return;
  }

  // Network-first for the HTML shell so security updates are received quickly.
  if (req.mode === 'navigate' || new URL(req.url).pathname.endsWith('/index.html')) {
    event.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then(c => c.put('./index.html', copy));
      return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }

  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(res => {
    if (res && res.ok && new URL(req.url).origin === self.location.origin) {
      const copy = res.clone();
      caches.open(CACHE_NAME).then(c => c.put(req, copy));
    }
    return res;
  })));
});
