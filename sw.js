// Cache name
const cacheName = 'cache-v1';


// adding stactic assets 
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


// add cache flies on installation
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


// activate service worker
self.addEventListener('activate', event => {
    console.log('activating service worker');
});


// intercept network request
self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for', event.request.url);
    event.respondWith(
        caches.match(event.request)
            // return cached files if they have been cached
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                // request files from network if the are not in browser cache
                return fetch(event.request);
            })
    );
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

