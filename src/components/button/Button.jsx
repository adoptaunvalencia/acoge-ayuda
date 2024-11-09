import React from 'react'

const Button = ({
  text,
  icon,
  bgColor,
  textColor,
  action = () => {},
  disabled = false
}) => {
  
  return (
    <button
      className='button-component'
      onClick={action}
      disabled={disabled}
      style={{
        backgroundColor: bgColor ? bgColor : 'var(--bg-lighter-gray)',
        color: textColor ? textColor : 'var(--text-primary'
      }}
    >
      {icon && <img className='icon' src={icon} alt="icon type help" />}
      {text && <span>{text}</span>}
    </button>
  )
}

export default Button
