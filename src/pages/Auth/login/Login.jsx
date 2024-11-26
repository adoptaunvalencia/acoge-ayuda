import { useContext, useEffect, useState } from 'react'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../../../components/form-group/Form'
import { FunctionContext } from '../../../contexts/function.contexts/FunctionContext'
import { RefContext } from '../../../contexts/ref.context/RefContext'
import './login.css'
import Spinner from '../../../components/spinner/Spinner'

const Login = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateLoad: { load },
    dispatchLoad,
    dispatchIsAuth,
    dispatchOffer
  } = useContext(ReducerContext)
  const { handleLoginSubmit } = useContext(FunctionContext)
  const { scroll, loginRef } = useContext(RefContext)

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
  useEffect(() => {
    setTimeout(() => {
      scroll(loginRef)
    }, 500)
  }, [])

  return (
    <>
      {load && (
        <div className='spinner'>
          <Spinner />
        </div>
      )}
      <div ref={loginRef} className='login-form fadeIn'>
        <h2>Iniciar Sesión</h2>
        <Form
          fields={fields}
          onSubmit={handleLoginSubmit}
          buttonText='Iniciar Sesión'
        />
        <Link to='../forgot-password'>Restablecer contraseña</Link>
      </div>
    </>
  )
}

export default Login
