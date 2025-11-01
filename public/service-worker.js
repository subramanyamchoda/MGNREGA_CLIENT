// service-worker.js
const CACHE_NAME = "athi-cache-v1";
const urlsToCache = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(urlsToCache)));
});

self.addEventListener("fetch", (event) => {
  // Skip non-GET and Vite dev files
  if (
    event.request.method !== "GET" ||
    event.request.url.includes("localhost:5173/@vite") ||
    event.request.url.includes("sockjs") ||
    event.request.url.includes("/src/")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((resp) => {
      return (
        resp ||
        fetch(event.request).catch(() =>
          caches.match("/index.html") // fallback for offline mode
        )
      );
    })
  );
});
