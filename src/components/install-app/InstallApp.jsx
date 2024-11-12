import { useEffect, useState } from 'react'
import './InstallApp.css'
import logo from '../../assets/icons/Logo.svg'
import Button from '../button/Button'

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
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
    <div className={`${!showInstallPrompt && 'fadeIn'}`}>
      {showInstallPrompt && (
      <Button
        text='Instalar APP'
        icon={logo}
        action={handleInstallClick}
      />
      )}
    </div>
  )
}

export default InstallApp
