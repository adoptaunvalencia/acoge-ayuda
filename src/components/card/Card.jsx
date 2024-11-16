import { useState, useContext, useCallback } from 'react'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import Button from '../button/Button'
import CardCategory from './CardCategory'
import ContactForm from '../contact-form/ContactForm'
import Modal from '../modal/Modal'
import './card.css'
import Spinner from '../spinner/Spinner'

const Card = ({ offer }) => {
  const { title, description, city, typeOffer, userId, status } = offer
  const {
    stateIsAuth: { user },
    dispatchOffer,
    stateOffer: { offers_map },
    stateLoad: { load },
    dispatchLoad
  } = useContext(ReducerContext)
  const {
    existToken,
    isModalOpen,
    setIsModalOpen,
    activeOffer,
    setActiveOffer
  } = useContext(FunctionContext)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title,
    description,
    status
  })

  const handleOpenModal = useCallback(
    (offer) => {
      setActiveOffer(offer)
      setIsModalOpen(true)
    },
    [setIsModalOpen, setActiveOffer]
  )

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setActiveOffer(null)
  }, [setIsModalOpen, setActiveOffer])

  const handleUpdateOffer = async (offer) => {
    dispatchLoad({ type: 'LOAD_TRUE' })
    try {
      const updatedFormData = {
        ...formData,
        lat: offer.location.coordinates[1],
        lon: offer.location.coordinates[0]
      }
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/assistance-offer/update-assistance/${
          offer._id
        }`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${existToken}`
          },
          body: JSON.stringify(updatedFormData)
        }
      )
      const result = await response.json()
      if (!response.ok) {
        console.error('Error updating offer:', result.message)
      } else {
        console.log('Offer updated successfully:', result.message)
        dispatchOffer({
          type: 'SET_OFFERS_MAP',
          payload: offers_map.map((off) =>
            off._id === offer._id ? { ...off, ...updatedFormData } : off
          )
        })
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setTimeout(() => {
        dispatchLoad({ type: 'LOAD_FALSE' })
      }, 500)
    }
  }

  const handleDeleteOffer = async (offer) => {
    if (!window.confirm('¿Estás seguro de eliminar esta oferta?')) {
      return
    }
    dispatchLoad({ type: 'LOAD_TRUE' })
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/assistance-offer/delete-assistance/${
          offer._id
        }`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${existToken}`
          }
        }
      )
      const result = await response.json()
      console.log(result)

      if (!response.ok) {
        console.log(result.message)
      } else {
        const updateOffers = offers_map.filter((off) => off._id !== offer._id)
        dispatchOffer({ type: 'SET_OFFERS_MAP', payload: updateOffers })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        dispatchLoad({ type: 'LOAD_FALSE' })
      }, 500)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  return (
    <div className='card fadeIn'>
      {load && (
        <Modal>
          <Spinner />
        </Modal>
      )}
      <div className='card__user-info show'>
        {userId?.avatar && <img src={userId.avatar} alt='User avatar' />}
        <span>
          {userId?.name} {userId?.lastname}
        </span>
      </div>
      {isEditing ? (
        <form
          className='card__form'
          onSubmit={(e) => {
            e.preventDefault()
            handleUpdateOffer(offer)
          }}
        >
          <div>
            <label htmlFor='title'>Título</label>
            <input
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='description'>Descripción</label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className='card__form-actions'>
            <Button
              text='Guardar'
              bgColor='var(--bg-primary-yellow)'
              textColor='var(--text-light)'
              borderRadius='var(--spacing-l)'
              type='submit'
            />
            <Button
              text='Cancelar'
              bgColor='var(--bg-light-red)'
              textColor='var(--text-primary-light)'
              borderRadius='var(--spacing-l)'
              action={() => setIsEditing(false)}
            />
          </div>
        </form>
      ) : (
        <>
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
          <div className='card__button-container show'>
            {typeof userId === 'object' && Object.keys(userId).length > 0 && (
              <>
                {userId?._id !== user._id ? (
                  <Button
                    text='Contactar'
                    bgColor='var(--bg-primary-yellow)'
                    textColor='var(--text-primary)'
                    borderRadius='var(--spacing-l)'
                    action={() => handleOpenModal(offer)}
                  />
                ) : (
                  <div className='card__content-btn-options'>
                    <Button
                      text='Modificar'
                      bgColor='var(--bg-primary-yellow)'
                      textColor='var(--text-primary)'
                      borderRadius='var(--spacing-l)'
                      action={() => setIsEditing(true)}
                    />
                    <Button
                      text='Eliminar'
                      bgColor='var(--bg-light-red)'
                      textColor='var(--text-primary-light)'
                      borderRadius='var(--spacing-l)'
                      action={() => handleDeleteOffer(offer)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Card
