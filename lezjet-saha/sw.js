/* LezJet Saha – çevrimdışı çalışma için önbellek */
const VERSION = "lezjet-saha-v2";
const SHELL = ["./", "index.html", "app.css", "app.js", "data.js", "config.js", "manifest.json",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Sunucu (Google) çağrılarına karışma
  if (url.hostname.endsWith("google.com") || url.hostname.endsWith("googleusercontent.com")) return;
  // Uygulama dosyaları: önce ağ, olmazsa önbellek (güncellemeler hemen gelsin)
  if (url.origin === self.location.origin) {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
    return;
  }
  // Kütüphaneler ve harita: önce önbellek
  if (url.hostname === "cdnjs.cloudflare.com" || url.hostname.endsWith("tile.openstreetmap.org")) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })));
  }
});
