import React from 'react';
import accommodation from '../../assets/icons/accommodation.png'
import hygiene from '../../assets/icons/hygiene.png'
import food from '../../assets/icons/food.png'
import pet_fostering from '../../assets/icons/pet_fostering.png'
import './card.css';

const categoryIcons = {
  accommodation,
  hygiene,
  food,
  pet_fostering,
};

const categoryLabels = {
  accommodation: 'camas',
  hygiene: 'baños',
  food: 'comida',
  pet_fostering: 'acepta mascotas',
};

const CardCategory = ({ category }) => {
  const { type, quantity } = category;
  const iconUrl = categoryIcons[type];
  const label = categoryLabels[type];

  return (
    <div className='card__offer-category'>
      <img src={iconUrl} alt={category} className="card__offer-category-icon" />
      <span className="card__offer-category-text">
        {type === 'pet_fostering' ? label : `${quantity} ${label}`}
      </span>
    </div>
  )
}

export default CardCategory
