import React, { useState, useContext } from 'react'
import './login.css'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { loginUser } from '../../../reducers/auth.reducer/auth.action'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateLoad: { load },
    dispatchLoad,
    dispatchIsAuth
  } = useContext(ReducerContext)

  const navigate = useNavigate()

  const handleInputChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value })

    // Remove the error for this field when the user starts typing
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    let validationErrors = {}

    if (!formData.email.trim())
      validationErrors.email = 'El correo es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      validationErrors.email = 'Correo no válido'
    if (!formData.password)
      validationErrors.password = 'La contraseña es obligatoria'

    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    const data = await loginUser(formData, dispatchLoad)
    dispatchIsAuth({ type: 'SET_USER', payload: data.user })
    dispatchIsAuth({ type: 'SET_AUTH_TRUE' })
    navigate('../dashboard')

  }

  return (
    <>
      {load ? (
        'Loading...'
      ) : (
        <div className='login-form'>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className='form__login'>
            <div className='form-input'>
              <Input
                type='email'
                label='Correo Electrónico'
                name='email'
                onChange={handleInputChange('email')}
                required
              />
              {errors.email && <div className='error-text'>{errors.email}</div>}
            </div>
            <div className='form-input'>
              <Input
                type='password'
                label='Contraseña'
                name='password'
                onChange={handleInputChange('password')}
                required
              />
              {errors.password && (
                <div className='error-text'>{errors.password}</div>
              )}
            </div>
            <div>
              <Button
                text='Iniciar Sesión'
                bgColor='var(--bg-lighter-gray)'
                textColor='var(--text-tertiary)'
              />
            </div>
          </form>
          {responseMessage && (
            <p className='response-message'>{responseMessage}</p>
          )}
        </div>
      )}
    </>
  )
}

export default Login
