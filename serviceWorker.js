
self.addEventListener('install', function(event) {
  // Perform install steps
  console.log('[PWA Builder] Install Event');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== 'images-cache') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate' || event.request.url.includes('/files') ) { // Only cache image files
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request)
            .then(function(response) {
              if (!response.ok) {
                return response; // Return the error response
              }
              const responseClone = response.clone();
              caches.open('images-cache').then(function(cache) {
                cache.put(event.request, responseClone);
              });
              return response;
            });
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
       .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  }
});