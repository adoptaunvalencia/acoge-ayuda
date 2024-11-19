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
  const [statusOffer, setStatusOffer] = useState(status)
  const {
    stateIsAuth: { user, isAuth },
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
    setActiveOffer,
    showToast,
    setMyOffers,
    myOffers
  } = useContext(FunctionContext)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title,
    description,
    status,
    lat: offer.location.coordinates[1],
    lon: offer.location.coordinates[0]
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
        ...formData
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
        showToast('error', result.message)
      } else {
        dispatchOffer({
          type: 'SET_OFFERS_MAP',
          payload: offers_map.map((off) =>
            off._id === offer._id ? { ...off, ...updatedFormData } : off
          )
        })
        if (myOffers.length > 0) {
          const update = myOffers.map((off) =>
            off._id === offer._id ? { ...off, ...updatedFormData } : off
          )
          setMyOffers(update)
        }
        showToast('success', result.message)
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
      if (!response.ok) {
        showToast('error', data.message)
      } else {
        const updateOffers = offers_map.filter((off) => off._id !== offer._id)
        dispatchOffer({ type: 'SET_OFFERS_MAP', payload: updateOffers })
        showToast('success', result.message)
        if (myOffers.length > 0) {
          const update = myOffers.filter(
            (of) => of._id.toString() !== offer._id.toString()
          )
          setMyOffers(update)
        }
      }
    } catch (error) {
      showToast('error', error.message)
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

  const handleChangeStatusOffer = async (offer) => {
    const newStatus = !statusOffer
    setStatusOffer(newStatus)
    const updatedFormData = {
      ...formData,
      status: newStatus
    }
    setFormData(updatedFormData)
    try {
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
        showToast('error', result.message)
      } else {
        //showToast('success', result.message)
        dispatchOffer({
          type: 'SET_OFFERS_MAP',
          payload: offers_map.map((off) =>
            off._id === offer._id ? { ...off, ...updatedFormData } : off
        )
      })
      setStatusOffer(result.assistanceOffer.status)
      
      
      if (myOffers.length > 0) {
        const update = myOffers.map((off) =>
          off._id === offer._id ? { ...off, ...updatedFormData } : off
        )
        console.log(update);
        setMyOffers(update)
        console.log(myOffers);
      }
      }
    } catch (error) {
      showToast('error', 'Hubo un error al actualizar el estado.')
      setStatusOffer(!newStatus)
    }
  }

  return (
    <div className='card fadeIn'>
      {isAuth && (
        <div className='card__creator'>
          <div className='card__creator-switch'>
            <label className='switch'>
              <input
                type='checkbox'
                checked={status}
                onChange={() => handleChangeStatusOffer(offer)}
              />
              <span className='slider'></span>
            </label>
            <span>{status ? 'Visible' : 'No visible'}</span>
          </div>
          {userId?._id === user?._id && <span>autor</span>}
        </div>
      )}
      {!load && (
        <Modal>
          <Spinner />
        </Modal>
      )}
      {activeOffer && (
        <Modal
          isModalOpen={isModalOpen}
          handleCloseModal={() => setIsModalOpen(false)}
        >
          <ContactForm />
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
          <div className='card__offer-categories show'>
            {typeOffer &&
              typeOffer.map((category, index) => (
                <CardCategory key={index} category={category} />
              ))}
          </div>
          <p className='show'>{description}</p>
          <div className='card__button-container'>
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
