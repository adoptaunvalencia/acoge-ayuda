import { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Button from '../button/Button'
import cookies from '/images/cookies-web.png'
import './Cookie.css'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import { Link } from 'react-router-dom'

const Cookie = () => {
  const {
    handleAcceptCookies,
    hasAcceptedCookies,
    setHasAcceptedCookies,
    showCookies,
    setShowCookies
  } = useContext(FunctionContext)

  useEffect(() => {
    if (!hasAcceptedCookies) {
      setShowCookies(true)
    }
  }, [hasAcceptedCookies])

  return (
    <div
      className={`cookies__container ${
        showCookies ? 'cookies__active' : 'cookies__inactive'
      }`}
      role='dialog'
      aria-live='polite'
    >
      <div>
        <img src={cookies} alt='Cookies icon' width='40' />
      </div>
      <div className='cookies__content-information'>
        <p>
          Utilizamos cookies necesarias para ofrecerte la mejor experiencia en
          nuestra web.
        </p>
        <p>
          Puedes aprender más sobre qué cookies utilizamos:{' '}
          <Link
            className='cookies__settings'
            to='/ajustes-de-privacidad'
          >
            Saber más.
          </Link>
        </p>
      </div>
      <div>
        <Button
          text='Aceptar'
          bgColor='var(--bg-primary-yellow)'
          borderRadius='5px'
          action={handleAcceptCookies}
          type='button'
        />
      </div>
    </div>
  )
}

export default Cookie
