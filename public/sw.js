const CACHE_NAME = "denkgang-shell-v1";
const OFFLINE_URL = "/offline.html";
const PRECACHE_URLS = [OFFLINE_URL, "/icons/icon-192.png", "/icons/icon-512.png"];

// Bewusst minimal: cached nur die Offline-Fallback-Seite und ein Icon, nicht
// Seiten/API-Antworten. Denkgang liefert ausschliesslich dynamische,
// sitzungsgebundene Inhalte (Server Actions, DB-Status DRAFT/APPROVED) - ein
// Cache-first/stale-while-revalidate fuer Seiten wuerde veraltete oder
// falsche (fremde Sitzung) Inhalte anzeigen. Dieser Service Worker existiert
// vor allem, damit die App ueberhaupt als PWA installierbar ist (Chrome
// verlangt einen registrierten fetch-Handler) und damit Offline-Nutzer eine
// verstaendliche Meldung statt des Browser-Fehlerbildschirms sehen.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;
  event.respondWith(fetch(event.request).catch(() => caches.match(OFFLINE_URL)));
});
