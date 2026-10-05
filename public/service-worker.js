const CACHE_NAME = 'godfrey-joseph-v4';
const IMAGE_CACHE_NAME = 'godfrey-joseph-images-v4';

// Critical core assets to pre-cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo-mono.png',
  '/hero-2.jpeg',
  '/logos/altior.png',
  '/logos/workbrook.png',
  '/logos/gefyra.png',
  '/logos/sheddie.png',
  '/logos/mike-mike.png',
  '/logos/light-bearers.png',
  '/logos/cornerstone.png',
  '/logos/gd.png',
  '/logos/the-mindful.png',
  '/cornerstone-app.png',
  '/mikeandmike.png',
  '/mindfulyouth.png',
  '/maseke.png',
  '/josephine-portfolio2.png'
];

// Install event - safe pre-caching without failing entire install on single asset error
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache each asset individually so one 404 does not reject the entire batch
      return Promise.allSettled(
        STATIC_ASSETS.map((url) =>
          fetch(url, { cache: 'no-cache' })
            .then((res) => {
              if (res.ok) return cache.put(url, res);
            })
            .catch((err) => {
              console.warn('[SW] Could not pre-cache:', url, err.message);
            })
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== IMAGE_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

const isImageRequest = (url, destination) => {
  return (
    destination === 'image' ||
    /\.(png|jpe?g|webp|avif|svg|gif|ico)(\?.*)?$/i.test(url) ||
    url.includes('res.cloudinary.com')
  );
};

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignore non-GET requests, non-http, and Chrome only-if-cached edge cases
  if (
    request.method !== 'GET' ||
    !request.url.startsWith('http') ||
    (request.cache === 'only-if-cached' && request.mode !== 'same-origin')
  ) {
    return;
  }

  // IMAGE STRATEGY: Cache-First with Network Fallback
  if (isImageRequest(request.url, request.destination)) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          // Cache successful same-origin or CORS responses (and opaque for cross-origin images)
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          // If offline and image missing from cache, fallback to logo
          const fallback = await cache.match('/logo-mono.png');
          if (fallback) return fallback;
          throw error;
        }
      })
    );
    return;
  }

  // DEFAULT ASSET STRATEGY: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
