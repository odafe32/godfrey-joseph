const CACHE_NAME = 'godfrey-joseph-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  'https://res.cloudinary.com/dllrkis3c/image/upload/v1771518882/odafe2_u6tgl5.jpg',
  'https://res.cloudinary.com/dllrkis3c/image/upload/v1771518884/shop-with-davion_hjtrux.png',
  'https://res.cloudinary.com/dllrkis3c/image/upload/v1771518877/josephine-portfolio2_z8i2j0.png',
  'https://res.cloudinary.com/dllrkis3c/image/upload/v1771518859/cornerstone-app_wvsai3.png',
  'https://res.cloudinary.com/dllrkis3c/image/upload/v1771518879/mikeandmike_r5as4d.png',
  'https://res.cloudinary.com/dllrkis3c/image/upload/v1771518881/mindfulyouth_ycaqgt.png',
  'https://res.cloudinary.com/dllrkis3c/image/upload/v1771518882/movie-ai_sp6qce.png',
  'https://res.cloudinary.com/dllrkis3c/image/upload/v1771518883/movie-ai2_yzem9u.png',
  'https://res.cloudinary.com/dllrkis3c/image/upload/v1771518879/maseke_qdczyv.png',
  'https://res.cloudinary.com/dllrkis3c/image/upload/v1771518878/logistics_rzklto.png',
  '/davion-wears.png',
  '/josephine-portfolio.png',
  '/cornerstone-global.png',
  '/mike-mikepartners.png',
  '/mindfulyouth-hub.png'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.error('[Service Worker] Failed to cache some assets:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('[Service Worker] Serving from cache:', event.request.url);
        return cachedResponse;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache images and static assets
        if (
          event.request.url.match(/\.(png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)$/)
        ) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      }).catch((error) => {
        console.error('[Service Worker] Fetch failed:', error);
        throw error;
      });
    })
  );
});
