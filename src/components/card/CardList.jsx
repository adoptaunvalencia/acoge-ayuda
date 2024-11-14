import React, { useState, useEffect, useContext } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import { fetchAuth } from '../../services/services'
import Card from './Card'
import Spinner from '../spinner/Spinner'
import Modal from '../modal/Modal'
import './card.css'

const CardList = ({ offers, activeTypes }) => {
  const { dispatchOffer } = useContext(ReducerContext)
  const [allOffers, setAllOffers] = useState([])
  const [currentOffers, setCurrentOffers] = useState(offers?.offers || [])

  const token = localStorage.getItem('AUTH_VALIDATE_USER_TOKEN')
  const [page, setPage] = useState(offers?.page || 0)
  const [totalPages, setTotalPages] = useState(offers?.totalPages || 1)
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
      console.log(newOffersData);
      

      if (
        newOffersData &&
        newOffersData.data &&
        Array.isArray(newOffersData.data.offers)
      ) {
        const newOffers = newOffersData.data.offers.filter(
          (newOffer) =>
            !currentOffers.some(
              (existingOffer) => existingOffer._id === newOffer._id
            )
        )
        setCurrentOffers((prevOffers) => [...prevOffers, ...newOffers])
        setAllOffers(newOffers)
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
          document.documentElement.scrollHeight - 400 &&
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

  useEffect(() => {
    const filteredOffers = allOffers.filter((offer) =>
      offer.typeOffer.some((typeObj) => activeTypes.includes(typeObj.type))
    )
    setCurrentOffers(filteredOffers)
  }, [activeTypes])

  const closeModal = () => setIsLoading(false)

  return (
    <div className='card-list'>
      {offers?.offers?.map((offer, index) => (
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
