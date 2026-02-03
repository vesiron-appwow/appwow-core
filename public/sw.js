self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("appwow-shell").then(cache => {
      return cache.addAll([
        "/",
        "/manifest.webmanifest"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
