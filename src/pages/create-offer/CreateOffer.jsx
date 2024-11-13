import { useContext, useState } from 'react';
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext';
import { createOffer } from '../../reducers/offers.reducer/offer.action';
import CreateOfferForm from '../../components/create-offer-form/CreateOfferForm';
import './CreateOffer.css';

const CreateOffer = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const {
    stateIsAuth: { user },
    dispatchLoad
  } = useContext(ReducerContext);

  const fields = [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'textarea', required: true },
    { name: 'expires', label: 'Hasta', type: 'date', required: true },
    { name: 'useUserAddress', label: 'Usar mi propia dirección', type: 'checkbox' },
    { name: 'city', label: 'Ciudad', type: 'text', required: true },
    { name: 'address', label: 'Dirección', type: 'text', required: true },
    { name: 'postalcode', label: 'Código Postal', type: 'text', required: true },
    { name: 'typeOffer', label: 'Tipo de ayuda', type: 'select', options: [
      { value: 'accommodation', label: 'Alojamiento' },
      { value: 'hygiene', label: 'Higiene' },
      { value: 'food', label: 'Comida' },
      { value: 'pet_fostering', label: 'Cuidado de Mascotas' }
    ], required: true
  },
  ];

  const handleFormSubmit = async (formData) => {
    const token = localStorage.getItem('AUTH_VALIDATE_USER_TOKEN')
    const data = await createOffer(formData, dispatchLoad, token)
    console.log(data)
  };

  return (
    <div className='create-offer-form'>
      <h2>Ofrecer mi ayuda</h2>
      <CreateOfferForm
        fields={fields}
        user={user}
        onSubmit={handleFormSubmit}
        buttonText="Ofrecer mi ayuda"  
      />
      {responseMessage && <p className='response-message'>{responseMessage}</p>}
    </div>
  );
};

export default CreateOffer;
