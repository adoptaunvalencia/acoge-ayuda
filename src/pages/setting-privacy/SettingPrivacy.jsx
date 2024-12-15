import { useContext, useEffect, useState } from 'react'
import './SettingPrivacy.css'
import { RefContext } from '../../contexts/ref.context/RefContext'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import Button from '../../components/button/Button'
import { Link } from 'react-router-dom'

const SettingPrivacy = () => {
  const [isNecessaryCookie, setIsNecessaryCookie] = useState(true)
  const { scroll, cookiesSettings } = useContext(RefContext)
  const {
    handleAcceptCookies,
    handleRefuseCookies,
    hasAcceptedCookies,
    setHasAcceptedCookies,
    showCookies,
    setShowCookies
  } = useContext(FunctionContext)

  useEffect(() => {
    setTimeout(() => {
      scroll(cookiesSettings)
    }, 500)
  }, [])
  return (
    <div ref={cookiesSettings} className='setting__container'>
      <div className='setting__content-title'>
        <h2>GDPR</h2>
      </div>
      <div>
        <div className='setting__content-information'>
          <h1>Resumen de privacidad</h1>
          <p>
            Esta web utiliza cookies para que podamos ofrecerte la mejor
            experiencia de usuario posible. La información de las cookies se
            almacena en tu navegador y realiza funciones tales como reconocerte
            cuando vuelves a nuestra web. Las cookies tienen una fecha de
            expìración de 7 días.
          </p>
        </div>
        <div className='setting__content-setting'>
          <div className='setting__content-setting-title'>
            <h4>Personalizar cookies</h4>
          </div>
          <div className='setting__content-setting-input'>
            <input
              type='checkbox'
              checked={isNecessaryCookie}
              onChange={() => setIsNecessaryCookie(!isNecessaryCookie)}
            />
            <label>
              Cookies necesarias para ofrecerte la mejor experiencia de usuario
              posible.
            </label>
          </div>
        </div>
        <div className='setting__content-btn-confirm'>
          {!hasAcceptedCookies && (
            <div>
              <p>¿Estas de acuerdo?</p>
              <Button
                text='Aceptar'
                bgColor='var(--bg-primary-yellow)'
                borderRadius='5px'
                action={handleAcceptCookies}
                type='button'
                disabled={!isNecessaryCookie}
              />
              <Button
                text='Rechazar'
                bgColor='var(--bg-primary-yellow)'
                borderRadius='5px'
                action={handleRefuseCookies}
                type='button'
              />
            </div>
          )}
        </div>
      </div>
      <div className='setting__content-links'>
        <Link className='cookies__settings' to='../privacy-policy'>
          🤓Mira también nuestras Políticas de Privacidad
        </Link>
        <Link className='cookies__settings' to='../'>
          🔥Volver a home
        </Link>
      </div>
    </div>
  )
}

export default SettingPrivacy
