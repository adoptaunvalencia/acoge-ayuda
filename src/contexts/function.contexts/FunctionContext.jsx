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
import { createEmail } from '../../reducers/emails.reducer/email.action'
import { fetchUser, loginUser } from '../../reducers/auth.reducer/auth.action'

export const FunctionContext = createContext()
export const FunctionProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
    radius: null
  })
  const [showPopup, setShowPopup] = useState(null)
  const [categorizedOffers, setCategorizedOffers] = useState({
    all: [],
    accommodation: [],
    hygiene: [],
    food: [],
    pet_fostering: []
  })
  const [activeOffer, setActiveOffer] = useState({})

  const {
    stateOffer: { offers, offers_map },
    stateIsAuth: { user, isAuth },
    dispatchIsAuth,
    dispatchOffer,
    dispatchLoad
  } = useContext(ReducerContext)

  const navigate = useNavigate()

  const token = localStorage.getItem('AUTH_VALIDATE_USER_TOKEN')
  const [existToken, setExistToken] = useState(token || null)

  const [urlAPi, setUrlApi] = useState({
    user: 'user',
    offersMap: 'assistance-offer/map-offers',
    offersCard: 'assistance-offer/'
  })
  const getProfile = async () => {
    dispatchLoad({ type: 'LOAD_TRUE' })
    try {
      const [user, offersMap, offersCard] = await Promise.all([
        fetchAuth(urlAPi.user, {}, 'GET', existToken),
        fetchAuth(urlAPi.offersMap, {}, 'GET', existToken)
      ])

      if (user?.data?.user) {
        dispatchIsAuth({ type: 'SET_USER', payload: user.data.user })
        dispatchIsAuth({ type: 'SET_AUTH_TRUE' })
      }

      if (offersMap?.data?.offers) {
        dispatchOffer({
          type: 'SET_OFFERS_MAP',
          payload: offersMap.data.offers
        })
      }
    } catch (error) {
      console.error('Error loading profile data:', error.message)
    } finally {
      setTimeout(() => {
        dispatchLoad({ type: 'LOAD_FALSE' })
      }, 1000)
    }
  }

  const getOffers = async () => {
    try {
      const offersMap = await fetchAuth(urlAPi.offersMap, {}, 'GET', existToken)

      if (offersMap?.data?.offers) {
        dispatchOffer({
          type: 'SET_OFFERS_MAP',
          payload: offersMap.data.offers
        })
      }
    } catch (error) {
      console.error('Error loading offers:', error.message)
    }
  }

  useEffect(() => {
    if (existToken) getProfile()
    else getOffers()
  }, [])

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

      if (userLocation.latitude && userLocation.longitude && maxDistance > 0) {
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

      //!FRAN AQUI HAY UN ERROR

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

  const handleFormSubmit = async (formData) => {
    dispatchLoad({ type: 'LOAD_TRUE' })
    try {
      const userReceiveId = activeOffer.userId._id
      const userReceiveData = await fetchUser(
        userReceiveId,
        dispatchLoad,
        token
      )

      const newEmail = {
        ...formData,
        userSend: user,
        userReceive: userReceiveData
      }
      const data = await createEmail(newEmail, dispatchLoad, token)
      setTimeout(() => {
        setIsModalOpen(false)
      }, 1000)
      console.log(data)
    } catch (error) {
      console.error('Error in handleFormSubmit:', error)
    } finally {
      setTimeout(() => {
        dispatchLoad({ type: 'LOAD_FALSE' })
      }, 1000)
    }
  }

  const handleLoginSubmit = async (formData) => {
    try {
      const data = await loginUser(formData, dispatchLoad)
      if (data && data.user) {
        dispatchIsAuth({ type: 'SET_USER', payload: data.user })
        dispatchIsAuth({ type: 'SET_AUTH_TRUE' })
        const token = data.token
        localStorage.setItem('AUTH_VALIDATE_USER_TOKEN', token)
        const offersMap = await fetchAuth(urlAPi.offersMap, {}, 'GET', token)
        dispatchOffer({ type: 'SET_OFFERS_MAP', payload: [] })
        dispatchOffer({
          type: 'SET_OFFERS_MAP',
          payload: offersMap.data.offers
        })
        navigate('../')
      } else {
        setResponseMessage('Error al iniciar sesión. Inténtalo de nuevo.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <FunctionContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        getProfile,
        getOffers,
        userLocation,
        setUserLocation,
        showPopup,
        setShowPopup,
        categorizedOffers,
        filterOffers,
        handleLogin,
        handleRegister,
        handleCreateOffer,
        handleFormSubmit,
        setActiveOffer,
        handleLoginSubmit
      }}
    >
      {children}
    </FunctionContext.Provider>
  )
}
