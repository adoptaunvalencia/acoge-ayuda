import { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Button from '../button/Button'
import cookies from '/images/cookies-web.png'
import './Cookie.css'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import { Link, useNavigate } from 'react-router-dom'

const Cookie = () => {
  const navigate = useNavigate()
  const {
    handleAcceptCookies,
    handleRefuseCookies,
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

  const handleNavigeteSetting = () => {
    navigate('/ajustes-de-privacidad')
  }

  return (
    <div
      className={`cookies__container ${
        showCookies ? 'cookies__active' : 'cookies__inactive'
      }`}
      role='dialog'
      aria-live='polite'
    >
      <div className='cookies__content'>
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
            <Link className='cookies__settings' to='/ajustes-de-privacidad'>
              Saber más.
            </Link>
          </p>
        </div>
      </div>
      <div className='cookies__btn'>
        <Button
          text='Aceptar'
          bgColor='var(--bg-primary-yellow)'
          borderRadius='5px'
          action={handleAcceptCookies}
          type='button'
        />
        <Button
          text='Rechazar'
          bgColor='var(--bg-primary-yellow)'
          borderRadius='5px'
          action={handleRefuseCookies}
          type='button'
        />
        <Button
          text='Personalizar'
          bgColor='var(--bg-light-gray)'
          borderRadius='5px'
          action={handleNavigeteSetting}
          type='button'
        />
      </div>
    </div>
  )
}

export default Cookie
