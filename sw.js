const PRECACHE = 'precache-v0.0.1';
const RUNTIME = 'runtime-v0.0.1';
const PRECACHE_URLS = [
    './',
    'project.bundle.js',
    'project.bundle.js.LICENSE',
    'index.html',
];


function createCacheBustedRequest(url) {
    let request = new Request(url, { cache: "reload" });
    if ("cache" in request) {
        return request;
    }
    let bustedUrl = new URL(url, self.location.href);
    bustedUrl.search += (bustedUrl.search ? "&" : "") + "cachebust=" + Date.now();
    return new Request(bustedUrl);
}

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {

    if (
        event.request.mode === "navigate" ||
        (event.request.method === "GET" && event.request.headers.get("accept").indexOf("text/html") > -1)
    ) {
        console.log("Handling fetch event for", event.request.url)
        event.respondWith(fetch(createCacheBustedRequest(event.request.url)).catch(error => {
            console.log("Fetch failed; returning offline page instead.", error)
            return caches.match("index.html")
        }));
    }
});

self.addEventListener('fetch', event => {

    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    }).catch((err) => { return err; });
                });
            })
        );
    }
});
