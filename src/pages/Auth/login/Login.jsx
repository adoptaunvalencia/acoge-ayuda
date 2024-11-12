import { useContext, useState } from 'react'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../reducers/auth.reducer/auth.action'
import './login.css'
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
    try {
      const data = await loginUser(formData, dispatchLoad)
      if (data && data.user) {
        dispatchIsAuth({ type: 'SET_USER', payload: data.user })
        dispatchIsAuth({ type: 'SET_AUTH_TRUE' })
        localStorage.setItem('AUTH_VALIDATE_USER_TOKEN', data.token)
        navigate('../')
      } else {
        setResponseMessage('Error al iniciar sesión. Inténtalo de nuevo.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='login-form'>
      <h2>Iniciar Sesión</h2>
      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        buttonText='Iniciar Sesión'
      />
      {responseMessage && <p className='response-message'>{responseMessage}</p>}
      <Link to='../forgot-password'>Restablecer contraseña</Link>
    </div>
  )
}

export default Login
