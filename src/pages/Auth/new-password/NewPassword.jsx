import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Form from '../../../components/form-group/Form'
import { resetPassword } from '../../../reducers/auth.reducer/auth.action'
import './NewPassword.css'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { FunctionContext } from '../../../contexts/function.contexts/FunctionContext'
import { RefContext } from '../../../contexts/ref.context/RefContext'
import Spinner from '../../../components/spinner/Spinner'

const NewPassword = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const {
    dispatchLoad,
    stateLoad: { load }
  } = useContext(ReducerContext)
  const { handleLoginSubmit } = useContext(FunctionContext)
  const { scroll, newPasswordRef } = useContext(RefContext)
  const navigate = useNavigate()
  const { showToast } = useContext(FunctionContext)

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
  useEffect(() => {
    setTimeout(() => {
      scroll(newPasswordRef)
    }, 500)
  }, [])

  const handleFormSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('FORGOT_TOKEN')
      const data = await resetPassword(formData, dispatchLoad, token, showToast)
      const formDataUser = {
        email: data.user.email,
        password: formData.password
      }
      await handleLoginSubmit(formDataUser)
    } catch (error) {
      setResponseMessage(
        'Error al restablecer la contraseña. Inténtalo de nuevo.'
      )
    }
  }

  return (
    <>
      {load && (
        <div className='spinner'>
          <Spinner />
        </div>
      )}
      <div ref={newPasswordRef} className='new-password fadeIn'>
        <h2>Restablecer Contraseña</h2>
        <Form
          fields={fields}
          onSubmit={handleFormSubmit}
          buttonText='Restablecer Contraseña'
        />
      </div>
    </>
  )
}

export default NewPassword
