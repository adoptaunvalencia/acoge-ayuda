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
import { RefContext } from '../../contexts/ref.context/RefContext'

const Home = () => {
  const {
    stateIsAuth: { user, isAuth },
    stateOffer: { offers, offers_map }
  } = useContext(ReducerContext)
  const { scroll, homeRef, mapRef } = useContext(RefContext)
  const [filteredOffers, setFilteredOffers] = useState([]);

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
    setTimeout(() => {
      scroll(homeRef)
    }, 500)
    const token = localStorage.getItem('AUTH_VALIDATE_USER_TOKEN')
    if (token) getProfile()
    else getOffers()
  }, [])

  const selectOptionsObject = {
    1: '1km',
    2: '2km',
    3: '3km'
  }

  const [activeType, setActiveType] = useState('')

  useEffect(() => {
    const fetchFilteredOffers = async () => {
      const result = await filterOffers(null, userLocation.radius, activeType);
      setFilteredOffers(result);
    };
    fetchFilteredOffers();
  }, [userLocation, activeType, filterOffers])

  const handleChangeSelect = (value, type) => {
    setUserLocation((prev) => ({
      ...prev,
      [type]: value
    }))
  }

  const selectPosition = () => {
    setTimeout(() => {
      scroll(mapRef)
    }, 500)
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setUserLocation((prev) => ({
        ...prev,
        latitude,
        longitude,
        radius: prev.radius
      }))
      handleSendFilter()
    })
  }

  const handleSendFilter = async () => {
/*     console.log('handleSendFilter called');
    console.log('userLocation:', userLocation);
    console.log('activeType:', activeType); */
  
/*     console.log('Calling filterOffers with radius:', userLocation.radius); */
    const result = await filterOffers(null, userLocation.radius, activeType);
/*     console.log('filterOffers result:', result); */
  
    setFilteredOffers(result);
  }

  const handleCategoryToggle = (category) => {
    setTimeout(() => {
      scroll(mapRef)
    }, 500)
    setActiveType((prevType) => (prevType === category ? '' : category))
  }

  useEffect(() => {
    handleSendFilter();
  }, [activeType]);

  return (
    <div className='home__container-sections fadeIn'>
      <section ref={homeRef} className='home__container'>
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
          activeTypes={activeType}
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
      <section ref={mapRef} className='section__map'>
        <Map offers={filteredOffers} />
      </section>
      <section className='section_card-offers'>
        <CardList activeType={activeType} offers={filteredOffers} />
      </section>
    </div>
  )
}

export default Home