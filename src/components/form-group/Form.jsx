import { useState } from 'react'
import Input from '../input/Input'
import Textarea from '../textarea/Textarea'
import Button from '../button/Button'
import './Form.css'

const Form = ({ fields, onSubmit, buttonText, initialValues = {} }) => {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleInputChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value })

    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const validationErrors = {}
    fields.forEach(({ name, label, required, validate }) => {
      const value = formData[name] || ''

      if (required && !value.trim()) {
        validationErrors[name] = `${label} es obligatorio`
      } else if (validate && !validate(value)) {
        validationErrors[name] = `${label} no es válido`
      }
    })

    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      {fields.map(({ label, name, type }) => (
        <div key={name} className='form-input'>
          {type === 'textarea' ? (
            <Textarea
              label={label}
              name={name}
              value={formData[name] || ''}
              onChange={handleInputChange(name)}
              maxLength={599}
              rows={6}
            />
          ) : (
            <Input
              type={type}
              label={label}
              name={name}
              value={formData[name] || ''}
              onChange={handleInputChange(name)}
            />
          )}
          {errors[name] && <div className='error-text'>{errors[name]}</div>}
        </div>
      ))}
      <Button
        text={buttonText}
        bgColor='var(--bg-lighter-gray)'
        textColor='var(--text-tertiary)'
      />
    </form>
  )
}

export default Form
