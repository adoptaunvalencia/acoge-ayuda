import React from 'react'

const Button = ({
  text,
  fontSize,
  icon,
  iconSixe=15,
  bgColor,
  textColor,
  padding,
  borderRadius,
  action = () => {},
  disabled = false,
  type = 'submit'
}) => {
  
  return (
    <button
      className={`button-component ${disabled  && 'disabled'}`}
      onClick={action}
      disabled={disabled}
      type={type}
      style={{
        fontSize: fontSize && fontSize,
        backgroundColor: bgColor ? bgColor : 'var(--bg-lighter-gray)',
        color: textColor ? textColor : 'var(--text-primary',
        padding: padding,
        borderRadius: borderRadius
      }}
    >
      {icon && <img className='icon' width={iconSixe} src={icon} alt='icon type help' />}
      {text && <span>{text}</span>}
    </button>
  )
}

export default Button
