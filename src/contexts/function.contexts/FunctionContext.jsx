import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useReducer
} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { ReducerContext } from '../reducer.contexts/ReducerContext'
import { fetchAuth } from '../../services/services'
import { fetchOffers } from '../../reducers/offers.reducer/offer.action'
import { createEmail } from '../../reducers/emails.reducer/email.action'
import {
  fetchUser,
  loginUser,
  registerUser
} from '../../reducers/auth.reducer/auth.action'
import useScrollToRef from '../../hooks/useScrollToRef'

export const FunctionContext = createContext()
export const FunctionProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [myOffers, setMyOffers] = useState([])
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
    radius: null
  })
  const [showPopup, setShowPopup] = useState(false)
  const [filteredOffers, setFilteredOffers] = useState([])
  const [activeOffer, setActiveOffer] = useState({})

  const {
    stateOffer: { offers, offers_map },
    stateIsAuth: { user, isAuth },
    dispatchIsAuth,
    dispatchOffer,
    dispatchLoad
  } = useContext(ReducerContext)

  const navigate = useNavigate()
  const [existToken, setExistToken] = useState(
    localStorage.getItem('AUTH_VALIDATE_USER_TOKEN') || null
  )

  const [urlAPi, setUrlApi] = useState({
    user: 'user',
    offersMap: 'assistance-offer/map-offers',
    offersCard: 'assistance-offer/'
  })

  const showToast = (type, message) => {
    if (type === 'success') {
      toast.success(message)
    } else if (type === 'error') {
      toast.error(message)
    } else {
      toast.info(message)
    }
  }

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
      localStorage.removeItem('AUTH_VALIDATE_USER_TOKEN')
      console.error('Error loading profile data:', error.message)
    } finally {
      setTimeout(() => {
        dispatchLoad({ type: 'LOAD_FALSE' })
      }, 1500)
    }
  }

  const getOffers = async () => {
    dispatchLoad({ type: 'LOAD_TRUE' })
    try {
      const offersMap = await fetchAuth(urlAPi.offersMap, {}, 'GET', existToken)
      if (offersMap?.data?.offers) {
        dispatchOffer({
          type: 'SET_OFFERS_MAP',
          payload: offersMap.data.offers
        })
      }
    } catch (error) {
      localStorage.removeItem('AUTH_VALIDATE_USER_TOKEN')
      console.error('Error loading offers:', error.message)
    } finally {
      setTimeout(() => {
        dispatchLoad({ type: 'LOAD_FALSE' })
      }, 1500)
    }
  }

  useEffect(() => {
    const isUserAuth = async () => {
      if (existToken) {
        await getProfile()
      } else {
        await getOffers()
      }
    }
    isUserAuth()
  }, [existToken])

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6378.1 // Radius of the earth in km
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
    (selectedCity, maxDistance, activeType) => {
      if (!offers_map) {
        return
      }
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
      if (activeType && activeType !== '') {
        offersToFilter = offersToFilter.filter((offer) => {
          return offer.typeOffer.some((typeObj) => {
            return typeObj.type === activeType
          })
        })
      }
      const uniqueOffers = []
      const seen = new Set()
      offersToFilter.forEach((offer) => {
        if (!seen.has(offer._id)) {
          uniqueOffers.push(offer)
          seen.add(offer._id)
        }
      })
      return uniqueOffers
    },
    [offers_map, userLocation]
  )

  const handleFilterMyOffers = () => {
    if (isAuth) {
      const offers = offers_map.filter(
        (offer) => offer.userId._id.toString() === user._id.toString()
      )
      if (offers.length > 0) {
        setMyOffers(offers)
      } else {
        return showToast('error', 'No tienes ofertas creadas.')
      }
    }
  }

  const handleLogin = () => {
    navigate('login')
  }
  const handleRegister = () => {
    navigate('register')
  }
  const handleLogout = async () => {
    dispatchLoad({ type: 'LOAD_TRUE' })
    localStorage.removeItem('AUTH_VALIDATE_USER_TOKEN')
    setExistToken(null)
    dispatchIsAuth({ type: 'SET_USER', payload: {} })
    dispatchIsAuth({ type: 'SET_AUTH_FALSE' })
    setTimeout(() => {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }, 1000)
  }

  const handleCreateOffer = () => {}

  const handleFormSubmit = async (formData) => {
    try {
      const userReceiveId = activeOffer.userId._id
      const newEmail = {
        formData: formData,
        offer: activeOffer
      }
      const data = await createEmail(
        newEmail,
        dispatchLoad,
        existToken,
        showToast
      )
      const updateOffers = filteredOffers.filter(
        (el) => el._id.toString() !== activeOffer._id.toString()
      )
      setFilteredOffers(updateOffers)
      dispatchOffer({ type: 'SET_OFFERS_MAP', payload: updateOffers })
      setIsModalOpen(false)
      return data
    } catch (error) {
      showToast('error', error.message)
    }
  }

  const handleLoginSubmit = async (formData) => {
    try {
      const data = await loginUser(formData, dispatchLoad, showToast)
      if (data && data.user) {
        dispatchIsAuth({ type: 'SET_USER', payload: data.user })
        dispatchIsAuth({ type: 'SET_AUTH_TRUE' })
        localStorage.setItem('AUTH_VALIDATE_USER_TOKEN', data.token)
        setExistToken(data.token)
        navigate('../')
        showToast('success', `Bienvenido ${data.user.name}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleRegisterFormSubmit = async (formData) => {
    const data = await registerUser(formData, dispatchLoad, showToast)
    if (data) {
      await handleLoginSubmit(formData)
    }
  }

  const localShow = localStorage.getItem('SHOW_POPUP')
  useEffect(() => {
    const isRegister = () => {
      if (!localShow) {
        setTimeout(() => {
          setShowPopup(true)
        }, 2500)
      } else {
        setShowPopup(false)
      }
    }
    isRegister()
  }, [])

  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(
    Cookies.get('PRIVACY-COOKIES-AUV') === 'true'
  )
  const [showCookies, setShowCookies] = useState(false)

  const handleAcceptCookies = () => {

      Cookies.set('PRIVACY-COOKIES-AUV', true, { expires: 7 })
      setHasAcceptedCookies(true)
      setShowCookies(false)
    }

  return (
    <FunctionContext.Provider
      value={{
        existToken,
        isModalOpen,
        setIsModalOpen,
        getProfile,
        getOffers,
        userLocation,
        setUserLocation,
        showPopup,
        setShowPopup,
        //categorizedOffers,
        filterOffers,
        handleLogin,
        handleRegister,
        handleLogout,
        handleCreateOffer,
        handleFormSubmit,
        activeOffer,
        setActiveOffer,
        handleLoginSubmit,
        handleRegisterFormSubmit,
        showToast,
        handleFilterMyOffers,
        filteredOffers,
        setFilteredOffers,
        myOffers,
        setMyOffers,
        localShow,
        handleAcceptCookies,
        hasAcceptedCookies, setHasAcceptedCookies,
        showCookies, setShowCookies
      }}
    >
      {children}
    </FunctionContext.Provider>
  )
}
