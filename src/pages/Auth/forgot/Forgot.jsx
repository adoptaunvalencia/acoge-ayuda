import { useContext, useState } from 'react'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { useNavigate } from 'react-router-dom'
import Form from '../../../components/form-group/Form'
import './Forgot.css'
import { forgotPassword } from '../../../reducers/auth.reducer/auth.action'

const Forgot = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateLoad: { load },
    dispatchLoad
  } = useContext(ReducerContext)

  const navigate = useNavigate()

  const fields = [
    {
      name: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }
  ]

  const handleFormSubmit = async (formData) => {
    const response = await forgotPassword(formData, dispatchLoad)
    if (response && response.success) {
      setResponseMessage(
        'Correo de recuperación enviado. Revisa tu bandeja de entrada.'
      )
      // Opcional: Puedes redirigir después de unos segundos
      setTimeout(() => navigate('../login'), 3000)
    } else {
      setResponseMessage('Hubo un error. Por favor, intenta nuevamente.')
    }
  }

  return (
    <div className='forgot-password-form'>
      {load ? (
        'Loading...'
      ) : (
        <>
          <h2>Recuperar Contraseña</h2>
          <Form
            fields={fields}
            onSubmit={handleFormSubmit}
            buttonText='Enviar Correo de Recuperación'
          />
          {responseMessage && (
            <p className='response-message'>{responseMessage}</p>
          )}
        </>
      )}
    </div>
  )
}

export default Forgot
