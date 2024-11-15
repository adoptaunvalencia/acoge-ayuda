import React, { useState, useContext } from 'react'
import Button from '../button/Button'
import whatsapp from '../../assets/icons/whatsapp-icon.svg'
import './card.css'
import CardCategory from './CardCategory'
import ContactForm from '../contact-form/ContactForm'
import Modal from '../modal/Modal'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'

const Card = ({ offer }) => {
  console.log(offer);
  
  const { title, description, city, typeOffer, userId } = offer
  const { setActiveOffer } = useContext(FunctionContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setActiveOffer(offer)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='card fadeIn'>
      {typeof userId === 'object' &&
        userId !== null &&
        Object.keys(userId).length > 0 && (
          <div className='card__user-info show'>
            <img src={userId.avatar} />
            <span>
              {userId.name} {userId.lastname}
            </span>
          </div>
        )}
      <div className='card__title-container show'>
        <h4>{title}</h4>
        <p>{city}</p>
      </div>
      <div className='card__offer-categories'>
        {typeOffer &&
          typeOffer.map((category, index) => (
            <CardCategory key={index} category={category} />
          ))}
      </div>
      <p>{description}</p>

      {typeof userId === 'object' &&
        userId !== null &&
        Object.keys(userId).length > 0 &&
        userId.phone && (
          <div className='card__button-container show'>
            <Button
              text='Contactar'
              bgColor='white'
              textColor='var(--text-primary)'
              borderRadius='var(--spacing-l)'
              action={handleOpenModal}
            />
          </div>
        )}

      <Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
        <ContactForm onSubmit={handleOpenModal} onCancel={handleCloseModal} />
      </Modal>
    </div>
  )
}

export default Card
