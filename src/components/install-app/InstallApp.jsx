import { useEffect, useState } from 'react'
import './InstallApp.css'
import logo from '../../assets/icons/Logo.svg'
import Button from '../button/Button'

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log('beforeinstallprompt fired') // Agrega este log
      event.preventDefault()
      setDeferredPrompt(event)
      setTimeout(() => {
        setShowInstallPrompt(true)
      }, 2000)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
    }
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setShowInstallPrompt(false)
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        setDeferredPrompt(null)
      })
    }
  }

  return (
    <>
      {showInstallPrompt && (
        <div
          className={`install-app ${showInstallPrompt && 'fadeIn'}`}
          onClick={handleInstallClick}
        >
          <p>¡Descarga nuestra aplicación ahora!</p>

          <div>
            <p>Instalar App</p>
            <img
              src={logo}
              alt='Adopta un Valenciano'
              width='35'
              loading='lazy'
            />
          </div>
        </div>
      )}
    </>
  )
}

export default InstallApp
