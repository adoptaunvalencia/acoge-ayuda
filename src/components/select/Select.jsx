import React, { useEffect, useRef, useState } from 'react'
import './select.css'

const Select = (props) => {
    const { label, name, id, tooltip, required = false, className = "", defaultOption = false, options = ['add select options'], onChange } = props
    
    const [isOpen, setIsOpen] = useState(false)
    const [selectedText, setSelectedText] = useState('')
    const [selectedValue, setSelectedValue] = useState('')
    const selectRef = useRef(null)

    const isOptionsArray = Array.isArray(options)

    const toggleOptions = () => { setIsOpen((prev) => !prev) }
    const handleOptionClick = (event) => {
        const isDefault = event.target.classList.contains('select-option--default')
        let value = ''

        setSelectedText('')
        setSelectedValue('')

        if (!isDefault) {
            const text = event.target.innerHTML
            value = event.target.dataset.value

            setSelectedText(text)
            setSelectedValue(value)
        }

        setIsOpen(false)

        if (onChange) onChange(value)
    }

    useEffect(() => {
        const handleSelectClick = (event) => {
            // Click outside select close it
            if (selectRef.current && !selectRef.current.contains(event.target)) setIsOpen(false)
            // Click select option
            else if (event.target.classList.contains('select-option')) handleOptionClick(event)
            else toggleOptions()
        }

        document.addEventListener('mousedown', handleSelectClick);
        
        return () => { document.removeEventListener('mousedown', handleSelectClick) }
    }, [])

    return (
        <div className={`form-select ${className}`} ref={selectRef}>
            <div className={`select ${isOpen ? "opened" : ""}`}>{selectedText}</div>
            <input 
                className={`select-input ${required && 'input-required'}`}
                id={id} 
                name={name} 
                type="text"
                value={selectedValue}
                onChange={(e) => onChange(e.target.value)}
                required ={required}
            />
            <label className="select-label" htmlFor={id}>{label}</label>
            <span className="select-tooltip">{tooltip}</span>
            {isOpen && (
                <ul className='select-options'>
                    { defaultOption && ( <li className='select-option select-option--default'>{label}</li> )}
                    {isOptionsArray ? (
                        options.map((option, index) => (
                            <li 
                                key={index} 
                                className="select-option" 
                                data-value={option}
                            >
                                {option}
                            </li>
                        ))
                    ) : (
                        Object.entries(options).map(([key, value]) => (
                            <li 
                                key={key} 
                                className="select-option" 
                                data-value={key}
                            >
                                {value}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    )
}

export default Select
