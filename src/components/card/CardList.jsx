import { useContext, useState } from 'react'
import Card from './Card'
import Spinner from '../spinner/Spinner'
import Modal from '../modal/Modal'
import './card.css'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'

const CardList = ({ activeTypes, offers }) => {
  const {
    stateIsAuth: { user }
  } = useContext(ReducerContext)
  const [isLoading, setIsLoading] = useState(false)
  const closeModal = () => setIsLoading(false)
  return (
    <div className='card-list'>
      {offers && offers.length > 0 ? (
        offers
          .filter((off) => {
            if (user?._id !== off?.userId?._id) {
              return off.status !== false
            }
            return true
          })
          .map((offer, index) => (
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
