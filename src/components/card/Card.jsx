import React, { useState } from 'react';
import Button from '../button/Button'
import whatsapp from '../../assets/icons/whatsapp-icon.svg'
import './card.css';
import CardCategory from './CardCategory';

const Card = ({ isAuth, user, offer }) => {
  const { name, lastname, avatar, phone } = user;
  const { title, description, city, typeOffer } = offer;

  const [buttonText, setButtonText] = useState('Contactar');

  const handleShowPhone = () => {
    setButtonText(user.phone);
  };

  return (
    <div className='card'>
      {isAuth && (
        <div className='card__user-info'>
          <img src={avatar} />
          <span>{name} {lastname}</span>
        </div>
      )}
      <div className='card__title-container'>
        <h4>{title}</h4>
        <p>{city}</p>
      </div>
      <div className='card__offer-categories'>
        {typeOffer && typeOffer.map((category, index) => (
          <CardCategory
            key={index}
            category={category}
          />
        ))}
      </div>
      <p>{description}</p>
      {isAuth && phone && (
        <div className='card__button-container'>
          <Button
            text={buttonText}
            icon={whatsapp}
            bgColor='white'
            textColor='var(--text-primary)'
            borderRadius='var(--spacing-l)'
            action={handleShowPhone}
          />
        </div>
      )}
    </div>
  )
}

export default Card
