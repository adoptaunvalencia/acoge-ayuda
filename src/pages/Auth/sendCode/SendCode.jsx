import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../../../components/form-group/Form'
import { verifyCode } from '../../../reducers/auth.reducer/auth.action'
import './sendCode.css'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { RefContext } from '../../../contexts/ref.context/RefContext'

const SendCode = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const navigate = useNavigate()
  const { dispatchLoad } = useContext(ReducerContext)
  const { scroll, sendCodeRef } = useContext(RefContext)
  const fields = [
    {
      name: 'verificationCode',
      label: 'Código de Verificación',
      type: 'text',
      required: true,
      validate: (value) => /^[0-9]{8}$/.test(value)
    }
  ]
  const handleFormSubmit = async (formData) => {
    try {
      const data = await verifyCode(formData, dispatchLoad)
      if (data.status) {
        navigate('../new-password')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      scroll(sendCodeRef)
    }, 500)
  }, [])

  return (
    <div ref={sendCodeRef} className='send-code fadeIn'>
      <h2>Verificación de Código</h2>
      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        buttonText='Enviar Código'
      />
    </div>
  )
}

export default SendCode
