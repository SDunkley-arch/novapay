// Minimal service worker for NovaPay PWA
const CACHE_NAME = 'novapay-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './dist/tailwind.css',
  './src/styles.css',
  './src/app.js',
  './src/router.js',
  './src/state.js',
  './src/lib/dom.js',
  './src/utils/format.js',
  './src/pages/landing.js',
  './src/pages/login.js',
  './src/pages/register.js',
  './src/pages/dashboard.js',
  './src/pages/add-money.js',
  './src/pages/transfer.js',
  './src/pages/bills.js',
  './src/pages/withdraw.js',
  './src/pages/card.js',
  './src/pages/profile.js',
  './assets/logo.svg',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
