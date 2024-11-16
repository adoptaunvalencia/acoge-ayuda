import { useContext, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { ReducerContext } from '../contexts/reducer.contexts/ReducerContext'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import FloatButton from '../components/float-button/FloatButton'
import Spinner from '../components/spinner/Spinner'
import ReCAPTCHA from 'react-google-recaptcha'
import './Layout.css'
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
  const {
    stateIsAuth: { user, isAuth },
    stateLoad: { load }
  } = useContext(ReducerContext)

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)

  useEffect(() => {
    const captchaVerified = sessionStorage.getItem('isCaptchaVerified')
    if (captchaVerified) {
      setIsCaptchaVerified(true)
    }
  }, [])

  const handleCaptchaVerification = (value) => {
    if (value) {
      setIsCaptchaVerified(true)
      sessionStorage.setItem('isCaptchaVerified', 'true')
    }
  }

  return (
    <>
      {load && (
        <div className='spinner'>
          <Spinner />
        </div>
      )}
      <header>
        <Header isAuth={isAuth} user={user} />
      </header>
      {isAuth && <FloatButton />}
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
      {!isCaptchaVerified && (
        <div className='captcha-overlay'>
          <div className='captcha-container'>
            <p>Por favor, verifica el CAPTCHA para continuar...</p>
            <ReCAPTCHA
              sitekey={`${import.meta.env.VITE_CAPTCHA_SITE_KEY}`}
              onChange={handleCaptchaVerification}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Layout
