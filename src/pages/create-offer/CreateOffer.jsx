import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import { createOffer } from '../../reducers/offers.reducer/offer.action'
import CreateOfferForm from '../../components/create-offer-form/CreateOfferForm'
import './CreateOffer.css'
import { RefContext } from '../../contexts/ref.context/RefContext'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import Spinner from '../../components/spinner/Spinner'

const CreateOffer = () => {
  const navigate = useNavigate()

  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateIsAuth: { user },
    dispatchLoad,
    dispatchOffer,
    stateOffer: { offers_map }
  } = useContext(ReducerContext)
  const { showToast } = useContext(FunctionContext)

  const { scroll, createOfferRef } = useContext(RefContext)
  const {
    stateLoad: { load }
  } = useContext(ReducerContext)

  const fields = [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      maxLength: 50,
      required: true
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      maxLength: '256',
      rows: 3,
      required: true
    },
    /* {
      name: 'useUserAddress',
      label: 'Usar mi propia dirección',
      type: 'checkbox'
    }, */
    { name: 'city', label: 'Ciudad', type: 'text', required: true },
    { name: 'address', label: 'Dirección', type: 'text', required: true },
    {
      name: 'postalcode',
      label: 'Código Postal',
      type: 'text',
      required: true
    },
    {
      name: 'typeOffer',
      label: 'Tipo de ayuda',
      type: 'select',
      options: {
        accommodation: 'Alojamiento',
        hygiene: 'Higiene',
        food: 'Comida',
        pet_fostering: 'Cuidado de Mascotas',
        other: 'Otros'
      },
      required: true
    }
  ]

  const handleFormSubmit = async (formData) => {
    const token = localStorage.getItem('AUTH_VALIDATE_USER_TOKEN')
    const data = await createOffer(formData, dispatchLoad, token, showToast)
    if (data.offers) {
      dispatchOffer({
        type: 'SET_OFFERS_MAP',
        payload: [...offers_map, data.offers]
      })
      navigate('/')
    } else {
      console.log('Hubo un problema con la dirección,')
    }
  }

  useEffect(() => {
    setTimeout(() => {
      scroll(createOfferRef)
    }, 500)
  }, [])

  return (
    <>
      {load && (
        <div className='spinner'>
          <Spinner />
        </div>
      )}
      <div ref={createOfferRef} className='create-offer-form fadeIn'>
        <div>
          <h2>¡Quiero ayudar!</h2>
          <p>Vamos a crear tu oferta de asistencia.</p>
          <i style={{ color: 'red' }}>
            Es muy importante no incluir{' '}
            <strong>
              números de teléfono, direcciones o cualquier información sensible.
            </strong>
          </i>
        </div>
        <CreateOfferForm
          fields={fields}
          user={user}
          onSubmit={handleFormSubmit}
          buttonText='Ofrecer mi ayuda'
        />
      </div>
    </>
  )
}

export default CreateOffer
