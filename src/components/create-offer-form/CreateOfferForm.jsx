import { useState } from 'react'
import Button from '../button/Button'
import './CreateOfferForm.css'
import Textarea from '../textarea/Textarea'
import Input from '../input/Input'
import Select from '../select/Select'
import Modal from '../modal/Modal'

const CreateOfferForm = ({ fields, user, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({})
  const [useUserAddress, setUseUserAddress] = useState(false)
  const [errors, setErrors] = useState({})
  const [selectedOptions, setSelectedOptions] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState(1)
  const [currentType, setCurrentType] = useState('')
  const [typeOffer, setTypeOffer] = useState([])

  const handleCheckboxChange = (e) => {
    const { checked } = e.target
    setUseUserAddress(checked)
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        city: user.city,
        address: user.address,
        postalcode: user.postalcode
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        city: '',
        address: '',
        postalcode: ''
      }))
    }
  }

  const handleInputChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value })
  }

  const validateForm = () => {
    const validationErrors = {}
    fields.forEach(({ name, label, required, validate }) => {
      let value
      if (
        useUserAddress &&
        (name === 'city' || name === 'address' || name === 'postalcode')
      ) {
        value = user[name]
      } else {
        value = formData[name]
      }
      if (required && (!value || value === '')) {
        validationErrors[name] = `${label} es obligatorio`
      } 
      if (validate && !validate(value)) {
        validationErrors[name] = `${label} no es válido`
      }
    })
    if (!formData?.typeOffer || formData?.typeOffer.length === 0) {
      validationErrors.typeOffer =
        'Selecciona al menos un tipo de oferta de asistencia'
    }
    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    const formDataToSubmit = {
      ...formData,
      ...(useUserAddress && {
        city: user.city,
        address: user.address,
        postalcode: user.postalcode
      }),
      typeOffer
    }
    onSubmit(formDataToSubmit)
  }

  const handleInputSelect = (value) => {
    setCurrentType(value)
    const existingOffer = typeOffer.find((offer) => offer.type === value)
    if (existingOffer) {
      setSelectedNumber(existingOffer.quantity)
    } else {
      setSelectedNumber(1)
    }
    setModalOpen(true)
  }

  const handleDeleteOption = (option) => {
    const updatedTypeOffer = typeOffer.filter(
      (offer) => offer.type !== option.type
    )
    setSelectedOptions(updatedTypeOffer)
    setTypeOffer(updatedTypeOffer)
    setFormData((prev) => ({
      ...prev,
      typeOffer: updatedTypeOffer
    }))
  }

  const handleAddTypeOffer = () => {
    if (currentType && selectedNumber >= 1 && selectedNumber <= 9) {
      const existingOfferIndex = typeOffer.findIndex(
        (offer) => offer.type === currentType
      )
      let updatedTypeOffer
      if (existingOfferIndex >= 0) {
        updatedTypeOffer = [...typeOffer]
        updatedTypeOffer[existingOfferIndex] = {
          ...updatedTypeOffer[existingOfferIndex],
          quantity: selectedNumber
        }
      } else {
        updatedTypeOffer = [
          ...typeOffer,
          { type: currentType, quantity: selectedNumber }
        ]
      }
      setTypeOffer(updatedTypeOffer)
      setSelectedOptions(updatedTypeOffer)
      setFormData({ ...formData, typeOffer: updatedTypeOffer })
      setModalOpen(false)
    } else {
      setErrors({ type: 'Selecciona un tipo y una cantidad válida' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      {fields?.map(
        ({ name, label, type, maxLength, required, rows, options }) => (
          <div key={name}>
            {name === 'city' || name === 'address' || name === 'postalcode' ? (
              useUserAddress ? (
                <div>
                  <p>
                    {(name === 'city' && 'Ciudad') ||
                      (name === 'address' && 'Dirección') ||
                      (name === 'postalcode' && 'Cod. Postal')}
                    : {formData[name]}
                  </p>
                </div>
              ) : (
                <div className='create__form-input'>
                  <Input
                    id={name}
                    type='text'
                    label={label}
                    name={name}
                    value={formData[name] || ''}
                    onChange={handleInputChange(name)}
                  />
                </div>
              )
            ) : (
              <div>
                {type === 'checkbox' ? (
                  <div className='create__form-checkbox'>
                    <input
                      id={name}
                      name={name}
                      type='checkbox'
                      className={`create__checkbox-input${
                        required ? ' create__input-required' : ''
                      }`}
                      checked={useUserAddress}
                      onChange={handleCheckboxChange}
                    />
                    <label>
                      <strong>Utilizar mi dirección</strong>
                    </label>
                  </div>
                ) : type === 'textarea' ? (
                  <div className='create__form-input'>
                    <Textarea
                      id={name}
                      label={label}
                      name={name}
                      value={formData[name] || ''}
                      maxLength={maxLength || 599}
                      rows={rows}
                      onChange={handleInputChange(name)}

                    />
                  </div>
                ) : type === 'select' ? (
                  <>
                    <Select
                      id={name}
                      label={label}
                      name={name}
                      tooltip='Selecciona el tipo de asistencia'
                      defaultOption={false}
                      options={options}
                      onChange={handleInputSelect}
                      required={false}
                    />
                    {selectedOptions.length > 0 && (
                      <div className='selected-options fadeIn'>
                        <div>
                          <h4>Opciones seleccionadas:</h4>
                          <i style={{ color: 'red' }}>
                            En caso de necesitar eliminar una opción{' '}
                            <strong>tan solo haz click sobre ella.</strong>
                          </i>
                        </div>
                        <ul>
                          {selectedOptions
                            ?.map((option, index) => {
                              return (
                                <li key={index}>
                                  <button
                                    type='button'
                                    onClick={() => handleDeleteOption(option)}
                                  >
                                    {option.type} | Per: {option.quantity}
                                  </button>
                                </li>
                              )
                            })
                            .reverse()}
                        </ul>
                      </div>
                    )}
                    <Modal
                      isModalOpen={modalOpen}
                      handleCloseModal={() => setModalOpen(false)}
                    >
                      <div className='create__modal fadeIn'>
                        <div className='modal-content'>
                          <h4>¿A cuántas personas puedes ayudar?</h4>
                          <input
                            type='number'
                            value={selectedNumber}
                            min='1'
                            max='9'
                            onChange={(e) => setSelectedNumber(e.target.value)}
                          />
                          <div className='modal-content-btns'>
                            <Button
                              text='Seleccionar'
                              bgColor='var(--bg-primary-yellow)'
                              textColor='var(--text-primary)'
                              action={handleAddTypeOffer}
                              type='button'
                            />
                            <Button
                              text='Cancelar'
                              bgColor='var(--bg-primary-red)'
                              textColor='var(--text-primary-light)'
                              action={() => setModalOpen(false)}
                              type='button'
                            />
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </>
                ) : (
                  <div className='create__form-input'>
                    <Input
                      id={name}
                      maxLength={maxLength}
                      type={type}
                      label={label}
                      name={name}
                      value={formData[name] || ''}
                      onChange={handleInputChange(name)}
                    />
                  </div>
                )}
              </div>
            )}
            {errors[name] &&
              ((useUserAddress &&
                !(
                  name === 'city' ||
                  name === 'address' ||
                  name === 'postalcode'
                )) ||
                (!useUserAddress &&
                  (name === 'city' ||
                    name === 'address' ||
                    name === 'postalcode'))) && (
                <div className='error-text'>{errors[name]}</div>
              )}
          </div>
        )
      )}
      <Button
        text={buttonText || 'Crear'}
        bgColor='var(--bg-lighter-gray)'
        textColor='var(--text-tertiary)'
      />
    </form>
  )
}

export default CreateOfferForm
