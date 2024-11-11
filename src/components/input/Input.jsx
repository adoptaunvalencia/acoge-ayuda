import React from 'react'

import './input.css'

const Input = (props) => {
    const { type, label, name, id, tooltip, required = false, className = "", onChange} = props
    
    const handleChange = (event) => { if (onChange) onChange(event.target.value) }
    
    return (
        <div className={`form-input ${className}`}>
            <input 
                className={`input${required ? ' input-required' : ''}`}
                id={id} 
                name={name} 
                type={type}
                onChange={handleChange}
            />
            <label className="input-label" htmlFor={id}>{label}</label>
            <span className="input-tooltip">{tooltip}</span>
        </div>
    )
}

export default Input