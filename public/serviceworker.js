const CACHE_NAME = 'Assignment-v1';
const CACHE_URLS =  ['Styles.css',
                    'index.html',                      
                    'Coffee.js',
                    'Coffee.html',
                    'Design1.css',
                    'Design1.html',
                    'Design2.css',
                    'Design2.html',
                    'Skills.html',
                    '404.html',
                    'manifest.json',
                    'Qualifications.html',
                    'Images/Design1_Page.webp',
                    'Images/Design1_Page.jpg',
                    'Images/Design2_Page.webp',
                    'Images/Design2_Page.jpg',
                    'Images/CoffeePage.webp',
                    'Images/CoffeePage.jpg',
                    'Images/AboutMeBanner.webp',
                    'Images/AboutMeBanner.jpg',
                    "Images/HTMLBanner.webp",
                    "Images/HTMLBanner.jpg",
                    "Images/Qualifications_Banner.webp",
                    "Images/Qualifications_Banner.jpg",
                    "Images/CoffeeBanner.webp",
                    "Images/CoffeeBanner.jpg",
                    "Images/Design_Img1.webp",
                    "Images/Design_Img1(1).webp",
                    "Images/Design_Img1(2).webp",
                    "Images/Design_Img1.jpg",
                    "Images/Design_Img2.webp",
                    "Images/Design_Img2(1).webp",
                    "Images/Design_Img2(2).webp",
                    "Images/Design_Img2.jpg",
                    "Images/Design_Img3.webp",
                    "Images/Design_Img3(1).webp",
                    "Images/Design_Img3(2).webp",
                    "Images/Design_Img3.jpg",
                    "Images/MainImg.webp",
                    "Images/MainImg(1).webp",
                    "Images/MainImg(2).webp",
                    "Images/MainImg(3).webp",
                    "Images/MainImg.jpg",
                    "Images/Favicon/android-chrome-192x192.png",
                    "Images/Favicon/android-chrome-512x512.png",
                    "Images/Favicon/apple-touch-icon.png",
                    "Images/Favicon/favicon-16x16.png",
                    "Images/Favicon/favicon-32x32.png",
                    "Images/Favicon/mstile-150x150.png"];

self.addEventListener("install", function(event){
    console.log("Service worker installed");
    event.waitUntil(
        //create and open cache
        caches.open(CACHE_NAME)
            .then(function(cache){
                console.log("Cache opened");
                //add all URLs to cache
                return cache.addAll(CACHE_URLS);
        })
    );
});

caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('Assignment-') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            //check whether asset is in cache
            if(response){
                //asset in cache, so return it
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            //asset not in cache so fetch asset from network
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
});

