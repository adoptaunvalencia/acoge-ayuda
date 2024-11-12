import { useContext, useState } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import { createOffer } from '../../reducers/offers.reducer/offer.action'
import Form from '../../components/form-group/Form'
import Select from '../../components/select/Select'
import './CreateOffer.css'

const CreateOffer = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const [useUserAddress, setUseUserAddress] = useState(false)

  const {
    stateLoad: { load },
    dispatchLoad
  } = useContext(ReducerContext)

  const userAddress = {
    city: 'ciudad prueba',
    address: 'calle prueba',
    postalcode: '11111'
  }

  const fields = [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'textarea', required: true },
    { name: 'expires', label: 'Hasta', type: 'date' },
    { name: 'useUserAddress', label: 'Usar mi propia dirección', type: 'checkbox' },
    {
      name: 'city',
      label: 'Ciudad',
      type: 'text',
      value: useUserAddress ? userAddress.city : '',
    },
    {
      name: 'address',
      label: 'Dirección',
      type: 'text',
      value: useUserAddress ? userAddress.address : '',
    },
    {
      name: 'postalcode',
      label: 'Código Postal',
      type: 'text',
      value: useUserAddress ? userAddress.postalcode : '',
    },
  ]

  const handleFormSubmit = async (formData) => {
    const token = localStorage.getItem('AUTH_VALIDATE_USER_TOKEN')
    const data = await createOffer(formData, dispatchLoad, token)
    console.log(data)
  }

  return (
    <div className='create-offer-form'>
      <h2>Ofrecer mi ayuda</h2>
        <Form
          fields={fields}
          onSubmit={handleFormSubmit}
          buttonText='Ofrecer mi ayuda'
        />
        {responseMessage && <p className='response-message'>{responseMessage}</p>}
    </div>
  )
}

export default CreateOffer
