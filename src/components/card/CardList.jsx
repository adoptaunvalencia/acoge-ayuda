import React, { useState, useEffect, useContext } from 'react'
import Card from './Card'
import Spinner from '../spinner/Spinner'
import './card.css'
import { fetchAuth } from '../../services/services'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import Modal from '../modal/Modal'

const CardList = ({ offers }) => {
  const { dispatchOffer } = useContext(ReducerContext)
  const [currentOffers, setCurrentOffers] = useState(
    offers.assistancesOffers || []
  )
  const token = localStorage.getItem('AUTH_VALIDATE_USER_TOKEN')
  const [page, setPage] = useState(offers.page || 1)
  const [totalPages, setTotalPages] = useState(offers.totalPages || 1)
  const [isLoading, setIsLoading] = useState(false)

  const loadMoreOffers = async () => {
    if (isLoading || page >= totalPages) {
      return
    }

    setIsLoading(true)
    try {
      const nextPage = page + 1
      const uriApiOfferCard = `assistance-offer?page=${nextPage}`
      const newOffersData = await fetchAuth(uriApiOfferCard, {}, 'GET', token)

      if (
        newOffersData &&
        newOffersData.data &&
        Array.isArray(newOffersData.data.assistancesOffers)
      ) {
        const newOffers = newOffersData.data.assistancesOffers.filter(
          (newOffer) =>
            !currentOffers.some(
              (existingOffer) => existingOffer._id === newOffer._id
            )
        )
        setCurrentOffers((prevOffers) => [...prevOffers, ...newOffers])
        setPage(nextPage)
        setTotalPages(newOffersData.data.totalPages || totalPages)
      }
    } catch (error) {
      console.log('Error loading offers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (currentOffers.length > 0) {
      dispatchOffer({
        type: 'SET_OFFERS',
        payload: {
          offers: currentOffers,
          totalPages,
          page
        }
      })
    }
  }, [currentOffers, dispatchOffer, totalPages, page])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 200 &&
        !isLoading
      ) {
        loadMoreOffers()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading, page, totalPages])

  useEffect(() => {
    if (currentOffers.length === 0 && !isLoading) {
      loadMoreOffers()
    }
  }, [])

  const closeModal = () => setIsLoading(false)

  return (
    <div className='card-list'>
      {currentOffers.map((offer, index) => (
        <Card key={`${offer._id}-${index}`} offer={offer} />
      ))}
      {isLoading && (
        <Modal isModalOpen={isLoading} handleCloseModal={closeModal}>
          <Spinner />
        </Modal>
      )}
    </div>
  )
}

export default CardList
