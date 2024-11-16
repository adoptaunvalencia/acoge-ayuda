import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import { createOffer } from '../../reducers/offers.reducer/offer.action'
import CreateOfferForm from '../../components/create-offer-form/CreateOfferForm'
import './CreateOffer.css'
import { RefContext } from '../../contexts/ref.context/RefContext'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'

const CreateOffer = () => {
  const navigate = useNavigate()

  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateIsAuth: { user },
    dispatchLoad,
    dispatchOffer,
    stateOffer: { offers_map }
  } = useContext(ReducerContext)
  const {showToast} = useContext(FunctionContext)

  const {scroll, createOfferRef} = useContext(RefContext)

  const fields = [
    { name: 'title', label: 'Título', type: 'text', required: true },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      maxLenght: 256,
      rows: 4,
      required: true
    },
    {
      name: 'useUserAddress',
      label: 'Usar mi propia dirección',
      type: 'checkbox'
    },
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
      options: [
        { value: 'accommodation', label: 'Alojamiento' },
        { value: 'hygiene', label: 'Higiene' },
        { value: 'food', label: 'Comida' },
        { value: 'pet_fostering', label: 'Cuidado de Mascotas' }
      ],
      required: true
    }
  ]

  const handleFormSubmit = async (formData) => {
    const token = localStorage.getItem('AUTH_VALIDATE_USER_TOKEN')
    const data = await createOffer(formData, dispatchLoad, token)    
    if(data.offers) {
      dispatchOffer({
        type: 'SET_OFFERS_MAP',
        payload: [...offers_map, data.offers]
      })
      navigate('/')
    } else {
      console.log('Hubo un problema con la dirección,');
      
    }
  }

  useEffect(() => {
    setTimeout(() => {
      scroll(createOfferRef)
    }, 500);
  },[])

  return (
    <div ref={createOfferRef} className='create-offer-form fadeIn'>
      <h2>Ofrecer mi ayuda</h2>
      <CreateOfferForm
        fields={fields}
        user={user}
        onSubmit={handleFormSubmit}
        buttonText='Ofrecer mi ayuda'
      />
      {responseMessage && <p className='response-message'>{responseMessage}</p>}
    </div>
  )
}

export default CreateOffer
