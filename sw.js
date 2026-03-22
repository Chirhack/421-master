const CACHE_NAME = '421-master-v1.4';
const ASSETS = [
  './',
  './index.html',
  './dice.wav',
  './clink.mp3',
  './victory.mp3',
  './loss.mp3',
  './manifest.json'
];

// Installation : on met les fichiers en cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation : on nettoie les vieux caches si la version change
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

// Stratégie : Réseau d'abord, sinon Cache (pour avoir toujours la dernière version si possible)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});