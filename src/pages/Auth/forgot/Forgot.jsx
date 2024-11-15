import { useContext, useEffect, useState } from 'react'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../../../components/form-group/Form'
import { forgotPassword } from '../../../reducers/auth.reducer/auth.action'
import './Forgot.css'
import { RefContext } from '../../../contexts/ref.context/RefContext'

const Forgot = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateLoad: { load },
    dispatchLoad
  } = useContext(ReducerContext)
  const { scroll, forgotRef } = useContext(RefContext)

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
    await forgotPassword(formData, dispatchLoad)
    setTimeout(() => navigate('../send-code'), 2000)
  }
  useEffect(() => {
    setTimeout(() => {
      scroll(forgotRef)
    }, 500)
  }, [])

  return (
    <div ref={forgotRef} className='forgot-password-form fadeIn'>
      <h2>Recuperar Contraseña</h2>
      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        buttonText='Enviar Correo de Recuperación'
      />
      <Link to='../send-code'>Tengo mi código</Link>
    </div>
  )
}

export default Forgot
