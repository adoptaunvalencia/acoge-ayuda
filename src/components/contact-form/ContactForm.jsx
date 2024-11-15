import React, { useContext, useMemo } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import Form from '../form-group/Form'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import Spinner from '../spinner/Spinner'
import './ContactForm.css'

const ContactForm = () => {
  const {
    stateLoad: { load },
  } = useContext(ReducerContext)

  const { handleFormSubmit } = useContext(FunctionContext)

  // Uso de useMemo para evitar recrear los campos en cada renderizado
  const fields = useMemo(() => [
    { name: 'subject', label: 'Asunto', type: 'text', required: true },
    {
      name: 'body',
      label: 'Mensaje',
      type: 'textarea',
      maxLenght: 256,
      rows: 4,
      required: true
    }
  ], [])

  return (
    <>
      {load ? (
        <Spinner />
      ) : (
        <div className='contact-form__container'>
          <h2 className='contact-form__title'>Contactar</h2>
          <p>
            Envía tu solicitud y el creador de la oferta te contactará pronto ❤️
          </p>
          <Form
            fields={fields}
            onSubmit={handleFormSubmit}
            buttonText='Enviar email'
          />
        </div>
      )}
    </>
  )
}

export default ContactForm
