import { useState } from 'react'
import Card from './Card'
import Spinner from '../spinner/Spinner'
import Modal from '../modal/Modal'
import './card.css'

const CardList = ({ activeTypes, offers }) => {
  const [isLoading, setIsLoading] = useState(false)
  const closeModal = () => setIsLoading(false)
  return (
    <div className='card-list'>
      {offers && offers.length > 0 ? (
        offers.map((offer, index) => (
          <Card key={`${offer._id}-${index}`} offer={offer} />
        ))
      ) : (
        <p>No se han encontrado ofertas.</p>
      )}
      {isLoading && (
        <Modal isModalOpen={isLoading} handleCloseModal={closeModal}>
          <Spinner />
        </Modal>
      )}
    </div>
  )
}

export default CardList