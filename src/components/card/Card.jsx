import React, { useState, useContext, useCallback } from 'react'
import Button from '../button/Button'
import CardCategory from './CardCategory'
import ContactForm from '../contact-form/ContactForm'
import Modal from '../modal/Modal'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import './card.css'

const Card = ({ offer }) => {
  const { title, description, city, typeOffer, userId } = offer
  const { isModalOpen, setIsModalOpen, activeOffer, setActiveOffer } =
    useContext(FunctionContext)

  const handleOpenModal = useCallback((offer) => {
    setActiveOffer(offer)
    setIsModalOpen(true)
  }, [offer, setIsModalOpen, setActiveOffer])


  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setActiveOffer(null)
  }, [setIsModalOpen, setActiveOffer])

  

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
              action={() => handleOpenModal(offer)}
            />
          </div>
        )}

      {activeOffer && activeOffer.id === offer.id && (
        <Modal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        >
          <ContactForm onSubmit={handleOpenModal} />
        </Modal>
      )}
    </div>
  )
}

export default Card
