const cacheName = 'cache-v1';

const cachedFiles = [
    '/',
    'index.html',
    'css/style.css',
    'js/script.js',
    'assets/favicon/android-chrome-192x192.png',
    'assets/favicon/android-chrome-512x512.png',
    'assets/favicon/apple-touch-icon.png',
    'assets/favicon/favicon-16x16.png',
    'manifest.json'
];

self.addEventListener('install', event => {
    console.log('Service worker installing...');
    self.skipWaiting();

    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(cachedFiles);
            })
    );
});


self.addEventListener('activate', event => {
    console.log('activating service worker');
});

self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);
            })
    );
});

