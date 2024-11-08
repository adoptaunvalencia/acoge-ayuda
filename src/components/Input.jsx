import React from 'react'

import 'styles/components/input.css'

const Input = (props) => {
    const { type, label, name, id, tooltip, required = false, className = ""} = props

    return (
        <div className={`form-input ${className} ${required && 'input-required'}`}>
            <input className="input" id={id} name={name} type={type} required />
            <label className="input-label" htmlFor={id}>{label}</label>
            <span className="input-tooltip">{tooltip}</span>
        </div>
    )
}

export default Input