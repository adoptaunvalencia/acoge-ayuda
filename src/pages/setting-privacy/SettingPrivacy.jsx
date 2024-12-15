import { useContext, useEffect } from 'react'
import './SettingPrivacy.css'
import { RefContext } from '../../contexts/ref.context/RefContext'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import Button from '../../components/button/Button'
import { Link } from 'react-router-dom'

const SettingPrivacy = () => {
  const { scroll, cookiesSettings } = useContext(RefContext)
  const {
    handleAcceptCookies,
    hasAcceptedCookies,
    setHasAcceptedCookies,
    showCookies,
    setShowCookies
  } = useContext(FunctionContext)

  console.log(hasAcceptedCookies)

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
