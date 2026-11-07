// Service Worker cho Hành Trình Đỏ (PWA Offline Support - DEP-03)
// Chiến lược:
// 1. Network-First cho HTML/điều hướng (tránh kẹt bản cũ sau deploy)
// 2. Stale-While-Revalidate cho Audio (phát ngay từ cache không giật lag, cập nhật ngầm khi có mạng)
// 3. Cache-First cho Assets biên dịch (/assets/* đã có mã băm nội dung - hash)
//
// LƯU Ý BẢO TRÌ: Khi thay thế hoặc thêm file âm thanh trong public/audio/, hãy tăng CACHE_VERSION
// (ví dụ: 'v1.0.3') để kích hoạt dọn dẹp cache cũ và precache tức thì cho toàn bộ client.
const CACHE_VERSION = 'v1.0.3';
const CACHE_NAME = `hanh-trinh-do-${CACHE_VERSION}`;

const STATIC_PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/audio/bgm-chu-de-chinh.mp3',
  '/audio/bgm-day-dan-dang.mp3',
  '/audio/bgm-hanh-quan.mp3',
  '/audio/bgm-hoi-hop.mp3',
  '/audio/bgm-song-bien.mp3'
];

self.addEventListener('install', (event) => {
  // Kích hoạt ngay lập tức worker mới mà không chờ đóng tab cũ
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_PRECACHE).catch((err) => {
        console.warn('[SW] Precache partial warning:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  // Dọn dẹp triệt để các cache phiên bản cũ
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key.startsWith('hanh-trinh-do-') && key !== CACHE_NAME) {
            console.log('[SW] Xóa cache cũ:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Chỉ can thiệp các request cùng origin
  if (url.origin !== location.origin) return;

  // Không can thiệp Range request (audio/video streaming) vì Cache API không hỗ trợ cache Partial Content 206
  if (event.request.headers.get('range')) {
    return;
  }

  // 1. CHIẾN LƯỢC CHO ĐIỀU HƯỚNG TRANG (HTML / Navigation) -> NETWORK-FIRST
  // Giúp người chơi/giảng viên luôn nạp phiên bản deploy mới nhất khi có mạng; chỉ nạp cache khi offline
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Khi offline: lấy từ cache trang hiện tại hoặc index.html fallback
          const cached = await caches.match(event.request);
          if (cached) return cached;
          const indexCached = await caches.match('/index.html');
          if (indexCached) return indexCached;
          return await caches.match('/');
        })
    );
    return;
  }

  // 2. CHIẾN LƯỢC CHO ÂM THANH (/audio/*) -> STALE-WHILE-REVALIDATE
  // Phát ngay lập tức từ cache để không có độ trễ âm thanh, đồng thời kiểm tra nạp bản mới ngầm nếu file trên server thay đổi
  if (url.pathname.startsWith('/audio/')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        }).catch(() => null);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. CHIẾN LƯỢC CHO STATIC ASSETS (/assets/*, icon, manifest) -> CACHE-FIRST
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
