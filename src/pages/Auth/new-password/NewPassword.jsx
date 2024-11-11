import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Form from '../../../components/form-group/Form'
import { resetPassword } from '../../../reducers/auth.reducer/auth.action'
import './newPassword.css'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'

const NewPassword = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const {dispatchLoad} = useContext(ReducerContext)
  const navigate = useNavigate()

  const { token } = useParams()

  const fields = [
    {
      name: 'password',
      label: 'Nueva Contraseña',
      type: 'password',
      required: true,
      validate: (value) => value.length >= 8
    }
  ]

  const handleFormSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('FORGOT_TOKEN')
      const data = await resetPassword(formData, dispatchLoad, token)
      console.log(data);
    } catch (error) {
      setResponseMessage(
        'Error al restablecer la contraseña. Inténtalo de nuevo.'
      )
    }
  }

  return (
    <div className='new-password'>
      <h2>Restablecer Contraseña</h2>
      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        buttonText='Restablecer Contraseña'
      />
      {responseMessage && <p className='response-message'>{responseMessage}</p>}
    </div>
  )
}

export default NewPassword
