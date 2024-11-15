import { useContext, useState } from 'react'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../reducers/auth.reducer/auth.action'
import './login.css'
import Form from '../../../components/form-group/Form'
import { fetchAuth } from '../../../services/services'
import { FunctionContext } from '../../../contexts/function.contexts/FunctionContext'

const Login = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateLoad: { load },
    dispatchLoad,
    dispatchIsAuth,
    dispatchOffer
  } = useContext(ReducerContext)
  const {handleLoginSubmit} =useContext(FunctionContext)

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

  return (
    <div className='login-form fadeIn'>
      <h2>Iniciar Sesión</h2>
      <Form
        fields={fields}
        onSubmit={handleLoginSubmit}
        buttonText='Iniciar Sesión'
      />
      <Link to='../forgot-password'>Restablecer contraseña</Link>
    </div>
  )
}

export default Login
