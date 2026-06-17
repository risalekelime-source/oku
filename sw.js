const CACHE = 'risale-v7';
const ASSETS = ['/oku/', '/oku/index.html', '/oku/manifest.json', '/oku/icon-192.png', '/oku/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (!e.request.url.startsWith(self.location.origin)) return;
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const net = fetch(e.request).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});

// ── PUSH BİLDİRİM ─────────────────────────────────────────────
self.addEventListener('push', e => {
  let title = '📖 Risale Okuma';
  let body = 'Bugünkü okumanı kaydetmeyi unutma!';
  let data = {};

  try {
    if (e.data) {
      data = e.data.json();
      if (data.title) title = data.title;
      if (data.body) body = data.body;
    }
  } catch {}

  e.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/oku/icon-192.png',
      badge: '/oku/icon-192.png',
      tag: 'daily-reminder',
      vibrate: [200, 100, 200],
      requireInteraction: false,
      data: { url: '/oku/' }
    })
  );
});

// ── BİLDİRİME TIKLANINCA UYGULAMAYI AÇ ──────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || '/oku/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.includes('/oku/') && 'focus' in c) return c.focus();
      }
      return clients.openWindow(url);
    })
  );
});
