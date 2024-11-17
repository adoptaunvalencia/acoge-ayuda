import React from 'react'
import './input.css'

const Input = (props) => {
  const {
    type,
    label,
    name,
    id,
    tooltip,
    required = false,
    className = '',
    maxLength = 256,
    disabled=false,
    onChange
  } = props

  const handleChange = (event) => {
    if (onChange) onChange(event.target.value)
  }

  return (
    <div className={`form-input ${className}`}>
      <input
        className={`input ${required && 'input-required'}`}
        id={id}
        name={name}
        type={type}
        onChange={handleChange}
        maxLength={maxLength}
        disabled={disabled}
      />
      <label className='input-label' htmlFor={id}>
        {label}
      </label>
      <span className='input-tooltip'>{tooltip}</span>
    </div>
  )
}

export default Input
