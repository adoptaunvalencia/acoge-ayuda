self.addEventListener('install', (event) => {
  console.log('Service Worker installed.')
  // Cache some assets, if needed
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.')
  // Clean up old caches, if needed
})

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url)
  // Handle fetch events (e.g., serve cached files)
})
