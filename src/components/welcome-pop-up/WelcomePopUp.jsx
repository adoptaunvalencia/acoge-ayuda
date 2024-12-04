import { useContext, useEffect, useState } from 'react'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import Button from '../button/Button'
import texts from '../../utils/PopUp/welcome.json'
import './welcomePopUp.css'
import logoAdopta from '../../assets/images/logo.webp'
import { Link } from 'react-router-dom'

const WelcomePopUp = () => {
  const { showPopup, setShowPopup, localShow } = useContext(FunctionContext)

  const handleCreateCount = () => {
    if (!localShow) {
      localStorage.setItem('SHOW_POPUP', true)
      setShowPopup(false)
    }
  }

  return (
    <>
      {showPopup && (
        <section className='welcome__container fadeIn'>
          <div className='welcome__brand'>
            <img
              className='welcome__brand-image'
              src={logoAdopta}
              alt='Logo adopta un Valenciano'
            />
            <p className='welcome__brand-title'>{texts.brandTitle}</p>
          </div>
          <div className='welcome__explain-container'>
            <p className='welcome__explain-title'>{texts.explainTextTitle1}</p>
            <p className='welcome__explain-text'>
              {texts.explainTextDescription1}
            </p> 
          </div>
          <div className='welcome__explain-container'>
            <p className='welcome__explain-title'>{texts.explainTextTitle2}</p>
            <p className='welcome__explain-text'>
              {texts.explainTextDescription2}
            </p>
          </div>
          <div className='welcome__button-container'>
            <Link to='register'>
              <Button
                text='Registrarme'
                bgColor='var(--bg-primary-red)'
                textColor='white'
                borderRadius='var(--spacing-l)'
                action={handleCreateCount}
              />
            </Link>
            <Link to='login'>
              <Button
                text='Login'
                bgColor='var(--bg-primary-yellow)'
                borderRadius='var(--spacing-l)'
                action={handleCreateCount}
              />
            </Link>
          </div>
          <Link to='privacy-policy' onClick={handleCreateCount}>
            Politicas de Privacidad
          </Link>
        </section>
      )}
    </>
  )
}

export default WelcomePopUp
