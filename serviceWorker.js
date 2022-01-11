const staticDevCoffee = "Sticky-Note-v1";
const assets = [
  "/",
  "/index.html",
  "/Js/index.js",
  "/Js/app.js",
  "/favicon.ico",
  "/Css/index.css"
];
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});