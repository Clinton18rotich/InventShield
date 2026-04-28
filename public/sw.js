const CACHE = 'inventshield-v1';
self.addEventListener('install', e => { self.skipWaiting() });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.map(k => k !== CACHE && caches.delete(k))))); self.clients.claim() });
self.addEventListener('fetch', e => { e.respondWith(fetch(e.request).then(r => { const rc = r.clone(); caches.open(CACHE).then(c => c.put(e.request, rc)); return r }).catch(() => caches.match(e.request))) });
