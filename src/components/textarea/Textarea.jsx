import React from 'react'

import './textarea.css'

const Textarea = (props) => {
    const { label, name, id, tooltip, maxLength, rows, required = false, className = "", onChange} = props
    
    const handleChange = (event) => { if (onChange) onChange(event.target.value) }
    
    return (
        <div className={`form-textarea ${className}`}>
            <textarea 
                className={`textarea ${required && 'input-required'}`}
                id={id} 
                name={name} 
                {...(maxLength && { maxLength })}
                {...(rows && { rows })} 
                onChange={handleChange}
                required 
            />
            <label className="textarea-label" htmlFor={id}>{label}</label>
            <span className="textarea-tooltip">{tooltip}</span>
        </div>
    )
}

export default Textarea