const CACHE_NAME = 'email-automator-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/offline',
        '/branding/email-automator-mark.svg',
        '/branding/email-automator-favicon-192.png',
        '/branding/email-automator-mark-512.png',
        '/branding/email-automator-maskable-192.png',
        '/branding/email-automator-maskable-512.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Never cache API routes or Auth endpoints.
  if (url.pathname.startsWith('/api/')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        // Fallback to offline page for document requests
        if (event.request.mode === 'navigate') {
          return caches.match('/offline');
        }
        return new Response('', { status: 404, statusText: 'Not Found' });
      });
    })
  );
});
