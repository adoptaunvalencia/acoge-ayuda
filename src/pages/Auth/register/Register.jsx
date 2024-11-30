import { useContext, useEffect, useState } from 'react'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { registerUser } from '../../../reducers/auth.reducer/auth.action'
import Form from '../../../components/form-group/Form'
import './Register.css'
import { FunctionContext } from '../../../contexts/function.contexts/FunctionContext'
import { RefContext } from '../../../contexts/ref.context/RefContext'
import Spinner from '../../../components/spinner/Spinner'

const Register = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateLoad: { load },
    dispatchLoad
  } = useContext(ReducerContext)
  const { handleRegisterFormSubmit } = useContext(FunctionContext)
  const { scroll, registerRef } = useContext(RefContext)

  const fields = [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'lastname', label: 'Apellido', type: 'text', required: true },
    { name: 'phone', label: 'Teléfono', type: 'tel', required: true },
    {
      name: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    {
      name: 'birthDate',
      label: 'Fecha de Nacimiento',
      type: 'date',
      required: true
    },
    { name: 'city', label: 'Ciudad', type: 'text', required: true },
    { name: 'address', label: 'Dirección', type: 'text', required: true },
    {
      name: 'postalcode',
      label: 'Código Postal',
      type: 'text',
      required: true
    },
    { name: 'password', label: 'Contraseña', type: 'password', required: true },
    { name: 'politics', label: 'Acepto los acuerdos de Politicas de Privacidad', type: 'checkbox', required: true }
  ]

  useEffect(() => {
    setTimeout(() => {
      scroll(registerRef)
    }, 500)
  }, [])

  return (
    <>
      {load && (
        <div className='spinner'>
          <Spinner />
        </div>
      )}
      <div ref={registerRef} className='register-form fadeIn'>
        <h2>Registro de Usuario</h2>
        <Form
          fields={fields}
          onSubmit={handleRegisterFormSubmit}
          buttonText='Registrarse'
        />
        {responseMessage && (
          <p className='response-message'>{responseMessage}</p>
        )}
      </div>
    </>
  )
}

export default Register
