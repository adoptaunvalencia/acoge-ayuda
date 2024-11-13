import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useReducer
} from 'react'
import { useNavigate } from 'react-router-dom'
import { ReducerContext } from '../reducer.contexts/ReducerContext'
import { fetchAuth } from '../../services/services'
import { fetchOffers } from '../../reducers/offers.reducer/offer.action'

export const FunctionContext = createContext()
export const FunctionProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null)
  const [showPopup, setShowPopup] = useState(null)
  const [categorizedOffers, setCategorizedOffers] = useState({
    all: [],
    accommodation: [],
    hygiene: [],
    food: [],
    pet_fostering: []
  })

  const {
    stateOffer: { offers, offers_map },
    stateIsAuth: { user },
    dispatchIsAuth,
    dispatchOffer,
    dispatchLoad
  } = useContext(ReducerContext)

  const navigate = useNavigate()

  const token = localStorage.getItem('AUTH_VALIDATE_USER_TOKEN')
  const [existToken, setExistToken] = useState(token || null)
  const getProfile = async () => {
    const url = 'user'
    const uriApi = 'assistance-offer/map-offers'
    const uriApiOfferCard = 'assistance-offer/'

    if (existToken) {
      dispatchLoad({ type: 'LOAD_TRUE' })
      try {
        const [user, offersMap, offersCard] = await Promise.all([
          fetchAuth(url, {}, 'GET', existToken),
          fetchAuth(uriApi, {}, 'GET', existToken),
          fetchAuth(uriApiOfferCard, {}, 'GET', existToken)
        ])

        if (user?.data?.user) {
          dispatchIsAuth({ type: 'SET_USER', payload: user.data.user })
          dispatchIsAuth({ type: 'SET_AUTH_TRUE' })
        }

        if (offersMap?.data?.assistancesOffers) {
          dispatchOffer({
            type: 'SET_OFFERS_MAP',
            payload: offersMap.data.assistancesOffers
          })
        }

        if (offersCard?.data) {
          dispatchOffer({
            type: 'SET_OFFERS',
            payload: offersCard.data
          })
        }
      } catch (error) {
        console.error('Error loading profile data:', error.message)
      } finally {
        dispatchLoad({ type: 'LOAD_FALSE' })
      }
    }
  }

  const getOffers = async () => {
    const uriApi = 'assistance-offer/map-offers'
    const uriApiOfferCard = 'assistance-offer/'

    try {
      const [offersMap, offersCard] = await Promise.all([
        fetchAuth(uriApi, {}, 'GET', existToken),
        fetchAuth(uriApiOfferCard, {}, 'GET', existToken)
      ])

      if (offersMap?.data?.assistancesOffers) {
        dispatchOffer({
          type: 'SET_OFFERS_MAP',
          payload: offersMap.data.assistancesOffers
        })
      }

      if (offersCard?.data) {
        dispatchOffer({
          type: 'SET_OFFERS',
          payload: offersCard.data
        })
      }
    } catch (error) {
      console.error('Error loading offers:', error.message)
    }
  }
  useEffect(() => {
    if (token) {
      getProfile()
    } else {
      getOffers()
    }
  }, [existToken])

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const filterOffers = useCallback(
    (selectedCity, maxDistance) => {
      if (!offers_map) return

      let offersToFilter = offers_map

      if (selectedCity && selectedCity !== 'all') {
        offersToFilter = offersToFilter.filter(
          (offer) => offer.city === selectedCity
        )
      }

      if (userLocation && maxDistance > 0) {
        offersToFilter = offersToFilter.filter((offer) => {
          const distance = getDistanceFromLatLonInKm(
            userLocation.latitude,
            userLocation.longitude,
            offer.location.coordinates[1],
            offer.location.coordinates[0]
          )
          return distance <= maxDistance
        })
      }

      const newCategorizedOffers = {
        accommodation: [],
        hygiene: [],
        food: [],
        pet_fostering: [],
        all: []
      }

      offersToFilter.forEach((offer) => {
        newCategorizedOffers.all.push(offer)
        offer.typeOffer.forEach((item) => {
          if (newCategorizedOffers[item.type]) {
            newCategorizedOffers[item.type].push(offer)
          }
        })
      })

      setCategorizedOffers(newCategorizedOffers)
    },
    [offers_map, userLocation]
  )

  const handleLogin = () => {
    navigate('login')
  }
  const handleRegister = () => {
    navigate('register')
  }

  const handleCreateOffer = () => {}

  return (
    <FunctionContext.Provider
      value={{
        userLocation,
        showPopup,
        setShowPopup,
        categorizedOffers,
        filterOffers,
        handleLogin,
        handleRegister,
        handleCreateOffer
      }}
    >
      {children}
    </FunctionContext.Provider>
  )
}
