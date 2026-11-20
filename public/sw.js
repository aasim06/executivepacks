// Self-destroying service worker to unregister any stale service workers on localhost:3000
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return self.clients.matchAll({ type: 'window' });
    })
  );
});
