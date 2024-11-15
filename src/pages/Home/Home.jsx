import { useContext, useEffect, useState } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import Button from '../../components/button/Button'
import FilterServicer from '../../components/filtro-services/FilterServices'
import Modal from '../../components/modal/Modal'
import WelcomePopUp from '../../components/welcome-pop-up/WelcomePopUp'
import { Map } from '../../components/map/Map'
import CardList from '../../components/card/CardList'
import './Home.css'
import Select from '../../components/select/Select'

const Home = () => {
  const {
    stateIsAuth: { user, isAuth },
    stateOffer: { offers, offers_map }
  } = useContext(ReducerContext)

  const {
    showPopup,
    setShowPopup,
    filterOffers,
    userLocation,
    setUserLocation,
    getProfile,
    getOffers
  } = useContext(FunctionContext)

  useEffect(() => {
    const token = localStorage.getItem('AUTH_VALIDATE_USER_TOKEN')
    if (token) getProfile()
    else getOffers()
  }, [])

  const selectOptionsObject = {
    1: '1km',
    2: '2km',
    3: '3km'
  }

  /*  const selectOptionsLocation = {
    home: 'Desde mi Casa',
    location: 'Ubicación Actual'
  } */

  const allCategories = ['accommodation', 'food', 'hygiene', 'pet_fostering']
  const [activeTypes, setActiveTypes] = useState(allCategories)

  const handleChangeSelect = (value, type) => {
    setUserLocation((prev) => ({
      ...prev,
      [type]: value
    }))
  }

  const selectPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setUserLocation((prev) => ({
        ...prev,
        latitude,
        longitude
      }))
      handleSendFilter()
    })
  }

  const handleSendFilter = () => {
    if (
      !userLocation.latitude ||
      !userLocation.longitude ||
      !userLocation.radius
    ) {
      console.error('Error: Coordenadas o radio no definidos correctamente')
      return
    }

    filterOffers(null, userLocation.radius)
  }

  const handleCategoryToggle = (category) => {
    setActiveTypes((prevTypes) => {
      if (prevTypes.includes(category)) {
        return prevTypes.filter((type) => type !== category)
      } else {
        return [...prevTypes, category]
      }
    })
  }

  return (
    <div className='home__container-sections fadeIn'>
      <section className='home__container'>
        <div className='home__content-title'>
          <h2>Resultados de Ayuda Disponibles en Tu Zona</h2>
        </div>
        <div className='home__content-description'>
          <p>
            Explora las opciones de ayuda cercanas a{' '}
            <strong>"TU UBICACIÓN"</strong> para:{' '}
            <strong>
              Alojamiento, Comida y/o Apoyo en situaciones de Emergencia
            </strong>
          </p>
        </div>
        <div className='home__content-buttons'>
          {/* <Select
            label='Ubicación'
            name='filer_location'
            id='filer_location'
            defaultOption={true}
            options={selectOptionsLocation}
            onChange={(value) => {
              handleChangeSelect(value, 'location')
            }}
          /> */}
          <div className='width_full'>
            <Select
              label='Buscar por Radio'
              name='filer_offers'
              id='filer_offers'
              defaultOption={true}
              options={selectOptionsObject}
              onChange={(value) => handleChangeSelect(value, 'radius')}
            />
          </div>
          <Button
            text='Buscar'
            bgColor='var(--bg-primary-red)'
            textColor='var(--text-primary-light)'
            borderRadius='50px'
            action={selectPosition}
          />
        </div>
      </section>
      <section className='show'>
        <FilterServicer
          onCategoryToggle={handleCategoryToggle}
          activeTypes={activeTypes}
        />
      </section>
      {!isAuth && (
        <Modal
          isModalOpen={showPopup}
          handleCloseModal={() => setShowPopup(false)}
        >
          <WelcomePopUp />
        </Modal>
      )}
      <section className='section__map'>
        <Map activeTypes={activeTypes} maxDistance={userLocation.radius} />
      </section>
      <section className='section_card-offers'>
        <CardList activeTypes={activeTypes} />
      </section>
    </div>
  )
}

export default Home
