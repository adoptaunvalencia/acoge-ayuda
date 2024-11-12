import { useContext, useState } from 'react'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../../../components/form-group/Form'
import { forgotPassword } from '../../../reducers/auth.reducer/auth.action'
import './Forgot.css'

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
    const data = await forgotPassword(formData, dispatchLoad)
    console.log(data)
    setTimeout(() => navigate('../send-code'), 3000)
  }

  return (
    <div className='forgot-password-form'>
      <h2>Recuperar Contraseña</h2>
      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        buttonText='Enviar Correo de Recuperación'
      />
      {responseMessage && <p className='response-message'>{responseMessage}</p>}
      <Link to='../send-code'>Tengo mi código</Link>
    </div>
  )
}

export default Forgot
