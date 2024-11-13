import { useState } from 'react';
import Button from '../button/Button';
import './CreateOfferForm.css';

const CreateOfferForm = ({ fields, user, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState('');
  const [useUserAddress, setUseUserAddress] = useState(true);
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

  const validateForm = () => {
    const validationErrors = {};
  
    fields.forEach(({ name, label, required, validate }) => {
      const value = String(formData[name] || '');
  
      if (required && !value.trim()) {
        validationErrors[name] = `${label} es obligatorio`;
      } else if (validate && !validate(value)) {
        validationErrors[name] = `${label} no es válido`;
      }
    });
  
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          {field.type === 'textarea' ? (
            <div className='form-input'>
              <textarea
                className={`input${fields.required ? ' input-required' : ''}`}
                id={field.name}
                name={field.name}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
              />
              <label className="input-label" htmlFor={field.name}>{field.label}</label>
              {field.tooltip && <span className="input-tooltip">{field.tooltip}</span>}
            </div>
          ) : field.type === 'checkbox' ? (
            <div className='form-checkbox'>
              <input
                className={`checkbox-input${fields.required ? ' input-required' : ''}`}
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
            <>
              <div className='form-select'>
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
              </div>
              
              <div className='form-input'>
                <input
                  className={`input${fields.required ? ' input-required' : ''}`}
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity || ''}
                  onChange={handleChange}
                  required
                />
                <label className="input-label" htmlFor={field.name}>Cantidad</label>
                {field.tooltip && <span className="input-tooltip">{field.tooltip}</span>}
              </div>

              <Button
                text='Añadir tipo de ayuda'
                bgColor='var(--bg-primary-red)'
                textColor='var(--text-primary-light)'
                borderRadius='var(--spacing-m)'
                action={addTypeOffer}
              />
            </>
          ) : (
            <>
              {['city', 'address', 'postalcode'].includes(field.name) && !useUserAddress ? (
              <div className='form-input'>
              <input
                className={`input${fields.required ? ' input-required' : ''}`}
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
              />
              <label className="input-label" htmlFor={field.name}>{field.label}</label>
              {field.tooltip && <span className="input-tooltip">{field.tooltip}</span>}
            </div>
            ) : (
              <>
              {field.name === 'title' && (
                <div className='form-input'>
                <input
                  className={`input${fields.required ? ' input-required' : ''}`}
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
                <label className="input-label" htmlFor={field.name}>
                  {field.label}
                </label>
                {field.tooltip && <span className="input-tooltip">{field.tooltip}</span>}
              </div>
              )}
              </>
            )}
           </>
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
