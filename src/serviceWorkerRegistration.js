export function register(config) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `/service-worker.js`

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          //console.log('Service Worker registrado con éxito:', registration)
        })
        .catch((error) => {
          console.error('Error al registrar el Service Worker:', error)
        })
    })
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister()
    })
  }
}
