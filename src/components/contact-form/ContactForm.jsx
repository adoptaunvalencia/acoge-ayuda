import React, { useContext, useMemo } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import Form from '../form-group/Form'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import Spinner from '../spinner/Spinner'
import './ContactForm.css'
import Modal from '../modal/Modal'
import { Link } from 'react-router-dom'

const ContactForm = ({ setIsModalOpen }) => {
  const {
    stateLoad: { load }
  } = useContext(ReducerContext)

  const { handleFormSubmit } = useContext(FunctionContext)
  const sendFormHelp = async (props) => {
    const response = await handleFormSubmit(props)
    if (response?.contactEmail?._id) {
      setTimeout(() => {
        setIsModalOpen(false)
      }, 300)
    }
  }

  const fields = useMemo(
    () => [
      { name: 'subject', label: 'Asunto', type: 'text', required: true },
      {
        name: 'body',
        label: 'Mensaje',
        type: 'textarea',
        maxLenght: 256,
        rows: 4,
        required: true
      }
    ],
    []
  )

  return (
    <>
      {load ? (
        <Spinner />
      ) : (
        <div className='contact-form__container'>
          <div>
            <h2 className='contact-form__title'>Contactar</h2>
          </div>
          <div>
            <p>
              Envía tu solicitud, y el creador de la oferta se pondrá en
              contacto contigo muy pronto. ❤️
            </p>
          </div>
          <div>
            <i className='contact-form__information'>
              En caso de que tengas dudas con respecto a los datos que se compartirán
              con el creador de la oferta, te recordamos que toda la información
              está publicada en las: {' '}
            </i><br />
              <Link to='privacy-policy' className='contact-form__link'>
                Politicas de Privacidad.
              </Link>
          </div>

          <Form
            fields={fields}
            onSubmit={sendFormHelp}
            buttonText='Contactar'
          />
        </div>
      )}
    </>
  )
}

export default ContactForm
