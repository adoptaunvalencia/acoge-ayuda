import React from 'react'

import './checkbox.css'

const Checkbox = (props) => {
    const { label, name, id, required = false, className = "", onChange } = props

    const handleChange = (event) => { if (onChange) onChange(event.target.checked) }

    return (
        <div className={`form-checkbox ${className}`}>
            <input 
                className={`checbox-input${required ? ' input-required' : ''}`}
                id={id} 
                name={name} 
                type="checkbox"
                onChange={handleChange}
                required 
            />
            { label && ( <label className="checkbox-label" htmlFor={id}>{label}</label> )}
        </div>
    )
}

export default Checkbox