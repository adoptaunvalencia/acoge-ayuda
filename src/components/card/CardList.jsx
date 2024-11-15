import { useState, useEffect, useContext, Fragment } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import Card from './Card'
import Spinner from '../spinner/Spinner'
import Modal from '../modal/Modal'
import './card.css'

const CardList = ({ activeTypes }) => {
  const { userLocation, filterOffers, categorizedOffers } =
    useContext(FunctionContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    filterOffers(null, userLocation.radius, activeTypes)
  }, [userLocation, activeTypes, filterOffers])

  const closeModal = () => setIsLoading(false)

  return (
    <div className='card-list'>
      {activeTypes.map(
        (type) =>
          categorizedOffers[type] && (
            <Fragment key={type}>
              {categorizedOffers[type].map((offer, index) => (
                <Card key={`${offer._id}-${index}`} offer={offer} />
              ))}
            </Fragment>
          )
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
