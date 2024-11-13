import { useState } from 'react';
import Button from '../button/Button';
import './CreateOfferForm.css';

const CreateOfferForm = ({ fields, user, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState('');
  const [useUserAddress, setUseUserAddress] = useState(false);
  const [errors, setErrors] = useState({});
  const [typeOffer, setTypeOffer] = useState([]);

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setUseUserAddress(checked);
    if (checked) {
      setFormData({
        ...formData,
        city: user.city,
        address: user.address,
        postalcode: user.postalcode,
      });
    } else {
      setFormData({
        ...formData,
        city: '',
        address: '',
        postalcode: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const addTypeOffer = (e) => {
    e.preventDefault();
    const { type, quantity } = formData;
    if (type && quantity) {
      const updatedTypeOffer = [...typeOffer, { type, quantity }];
      setTypeOffer(updatedTypeOffer);
      setFormData({
        ...formData,
        typeOffer: updatedTypeOffer,
      });
      setErrors({});
    } else {
      setErrors({ ...errors, type: 'Selecciona un tipo y una cantidad' });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, typeOffer });
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ) : field.type === 'checkbox' ? (
            <div className={`form-checkbox`}>
              <input
                id={field.name}
                name={field.name}
                type="checkbox"
                checked={useUserAddress}
                onChange={handleCheckboxChange}
              />
              {field.label && (
                <label className="checkbox-label" htmlFor={field.name}>
                  {field.label}
                </label>
              )}
            </div>
          ) : field.type === 'select' ? (
            <div>
              <select
                id="type"
                name="type"
                value={formData.type || ''}
                onChange={handleChange}
                required
              > 
                <option value="">Selecciona un tipo de ayuda</option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={formData.quantity || ''}
                onChange={handleChange}
                required
                placeholder="Cantidad"
              />

              <Button
                text='Añadir tipo de ayuda'
                bgColor='var(--bg-primary-red)'
                textColor='var(--text-primary-light)'
                borderRadius='var(--spacing-m)'
                action={addTypeOffer}
              />
            </div>
          ) : (
            <div className={`form-input`}>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
                disabled={['city', 'address', 'postalcode'].includes(field.name) && useUserAddress}
                className={`input${field.required ? ' input-required' : ''}`}
              />
              <label className="input-label" htmlFor={field.name}>
                {field.label}
              </label>
              {field.tooltip && <span className="input-tooltip">{field.tooltip}</span>}
            </div>
          )}
          {errors[field.name] && <div>{errors[field.name]}</div>}
        </div>
      ))}

      {typeOffer.length > 0 && (
        <div>
          <h3>Tipos y Cantidades Seleccionados:</h3>
          <ul>
            {typeOffer.map((selection, index) => (
              <li key={index}>
                Tipo: {selection.type} - Cantidad: {selection.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default CreateOfferForm;
