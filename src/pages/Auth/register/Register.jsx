import React, { useState, useContext } from 'react'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { registerUser } from '../../../reducers/auth.reducer/auth.action'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    birthDate: '',
    city: '',
    address: '',
    postalcode: ''
  })
  const [errors, setErrors] = useState({})
  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateLoad: { load },
    dispatchLoad
  } = useContext(ReducerContext)

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

    if (!formData.name.trim())
      validationErrors.name = 'El nombre es obligatorio'
    if (!formData.lastname.trim())
      validationErrors.lastname = 'El apellido es obligatorio'
    if (!formData.phone.trim())
      validationErrors.phone = 'El teléfono es obligatorio'
    if (!formData.email.trim())
      validationErrors.email = 'El correo es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      validationErrors.email = 'Correo no válido'
    if (!formData.password)
      validationErrors.password = 'La contraseña es obligatoria'
    if (!formData.birthDate)
      validationErrors.birthDate = 'La fecha de nacimiento es obligatoria'
    if (!formData.city.trim())
      validationErrors.city = 'La ciudad es obligatoria'
    if (!formData.address.trim())
      validationErrors.address = 'La dirección es obligatoria'
    if (!formData.postalcode.trim())
      validationErrors.postalcode = 'El código postal es obligatorio'

    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    const data = await registerUser(formData, dispatchLoad)
    console.log(data)
  }

  return (
    <>
      {load ? (
        'Loading...'
      ) : (
        <div className='register-form'>
          <h2>Registro de Usuario</h2>
          <form onSubmit={handleSubmit} className='form__register'>
            <div className='form-input'>
              <Input
                type='text'
                label='Nombre'
                name='name'
                onChange={handleInputChange('name')}
                required
              />
              {errors.name && <div className='error-text'>{errors.name}</div>}
            </div>
            <div className='form-input'>
              <Input
                type='text'
                label='Apellido'
                name='lastname'
                onChange={handleInputChange('lastname')}
                required
              />
              {errors.lastname && (
                <div className='error-text'>{errors.lastname}</div>
              )}
            </div>
            <div className='form-input'>
              <Input
                type='tel'
                label='Teléfono'
                name='phone'
                onChange={handleInputChange('phone')}
                required
              />
              {errors.phone && <div className='error-text'>{errors.phone}</div>}
            </div>
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
                type='date'
                label='Fecha de Nacimiento'
                name='birthDate'
                onChange={handleInputChange('birthDate')}
                required
              />
              {errors.birthDate && (
                <div className='error-text'>{errors.birthDate}</div>
              )}
            </div>
            <div className='form-input'>
              <Input
                type='text'
                label='Ciudad'
                name='city'
                onChange={handleInputChange('city')}
                required
              />
              {errors.city && <div className='error-text'>{errors.city}</div>}
            </div>
            <div className='form-input'>
              <Input
                type='text'
                label='Dirección'
                name='address'
                onChange={handleInputChange('address')}
                required
              />
              {errors.address && (
                <div className='error-text'>{errors.address}</div>
              )}
            </div>
            <div className='form-input'>
              <Input
                type='text'
                label='Código Postal'
                name='postalcode'
                onChange={handleInputChange('postalcode')}
                required
              />
              {errors.postalcode && (
                <div className='error-text'>{errors.postalcode}</div>
              )}
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
                text='Registrarse'
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

export default Register
