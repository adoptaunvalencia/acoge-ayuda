import React from 'react';
import './button.css';
import SearchIcon from '../../assets/icons/search-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import WhatsappIcon from '../../assets/icons/whatsapp-icon.svg';

const Button = ({ text, icon, width, bgColor, action }) => {

  const iconSrc = icon === 'search' ? SearchIcon :
                  icon === 'edit' ? EditIcon :
                  icon === 'whatsapp' ? WhatsappIcon :
                  null;

  return (
    <button
      className={`button ${bgColor === 'white' ? 'button-white' : 'button-red'}`}
      style={{ width }}
      onClick={action}
    >
      {iconSrc && <img src={iconSrc} className="button-icon" />}
      {text}
    </button>
  )
}

export default Button;