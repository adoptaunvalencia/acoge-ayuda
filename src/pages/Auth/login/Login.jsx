import React, { useState, useContext } from 'react'
import './login.css'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { loginUser } from '../../../reducers/auth.reducer/auth.action'
import { useNavigate } from 'react-router-dom'
import Form from '../../../components/form-group/Form'


const Login = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateLoad: { load },
    dispatchLoad,
    dispatchIsAuth
  } = useContext(ReducerContext)

  const navigate = useNavigate()
  const fields = [
    {
      name: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      required: true
    }
  ]

  const handleFormSubmit = async (formData) => {
    const data = await loginUser(formData, dispatchLoad)
    if (data && data.user) {
      dispatchIsAuth({ type: 'SET_USER', payload: data.user })
      dispatchIsAuth({ type: 'SET_AUTH_TRUE' })
      navigate('../dashboard')
    } else {
      setResponseMessage('Error al iniciar sesión. Inténtalo de nuevo.')
    }
  }

  return (
    <div className='login-form'>
      {load ? (
        'Loading...'
      ) : (
        <>
          <h2>Iniciar Sesión</h2>
          <Form
            fields={fields}
            onSubmit={handleFormSubmit}
            buttonText='Iniciar Sesión'
          />
          {responseMessage && (
            <p className='response-message'>{responseMessage}</p>
          )}
        </>
      )}
    </div>
  )
}

export default Login
