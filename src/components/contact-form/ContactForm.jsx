import { useState, useContext } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext';
import Form from '../form-group/Form'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext';
import './ContactForm.css'

const ContactForm = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateLoad: { load },
    dispatchLoad,
  } = useContext(ReducerContext)

  const { handleFormSubmit } = useContext(FunctionContext)

  const fields = [
    { name: 'subject', label: 'Asunto', type: 'text', required: true },
    { name: 'body', label: 'Mensaje', type: 'textarea', maxLenght: 256, rows: 4, required: true },
  ]

  return (
    <div className='contact-form__container '>
      <h2 className='contact-form__title'>Contactar</h2>
      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        buttonText='Enviar email'
      />
      {responseMessage && <p className='response-message'>{responseMessage}</p>}
    </div>
  )
}

export default ContactForm