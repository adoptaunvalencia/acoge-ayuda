import React from 'react'

const Button = ({
  text,
  fontSize,
  icon,
  bgColor,
  textColor,
  padding,
  borderRadius,
  action = () => {},
  disabled = false
}) => {
  
  return (
    <button
      className='button-component'
      onClick={action}
      disabled={disabled}
      style={{
        fontSize: fontSize && fontSize,
        backgroundColor: bgColor ? bgColor : 'var(--bg-lighter-gray)',
        color: textColor ? textColor : 'var(--text-primary',
        padding: padding,
        borderRadius:borderRadius
      }}
    >
      {icon && <img className='icon' src={icon} alt="icon type help" />}
      {text && <span>{text}</span>}
    </button>
  )
}

export default Button
