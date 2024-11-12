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
import { fetchFiltersRadius } from '../../reducers/offers.reducer/offer.action'

const Home = () => {
  const [userLocation, setUserLocation] = useState({
    lat: null,
    lon: null,
    location: null,
    radius: null
  })
  const {
    stateIsAuth: { user, isAuth },
    stateOffer: { offers }
  } = useContext(ReducerContext)
  
  const { showPopup, setShowPopup } = useContext(FunctionContext)

  const selectOptionsObject = {
    1: '1km',
    2: '2km',
    3: '3km'
  }

  const selectOptionsLocation = {
    home: 'Home',
    location: 'Actually Location'
  }

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
        lat: latitude,
        lon: longitude,
        location: 'location'
      }))
    })
  }

  const handleSendFilter = async () => {
    const data = await fetchFiltersRadius(userLocation)
  }

  return (
    <div className='home__container-sections'>
      <section className='home__container'>
        <div className='home__content-title'>
          <h2>Resultados de Ayuda Disponibles en Tu Zona</h2>
        </div>
        <div className='home__content-description'>
          <p>
            Explora las opciones de ayuda cercanas para alojamiento, comida y
            apoyo en situaciones de emergencia
          </p>
        </div>
        <div className='home__content-buttons'>
          <Select
            label='Ubicación'
            name='filer_location'
            id='filer_location'
            defaultOption={true}
            options={selectOptionsLocation}
            onChange={(value) => handleChangeSelect(value, 'location')}
          />
          <Select
            label='Distancia máxima'
            name='filer_offers'
            id='filer_offers'
            defaultOption={true}
            options={selectOptionsObject}
            onChange={(value) => handleChangeSelect(value, 'radius')}
          />
          <Button
            text='Buscar'
            bgColor='var(--bg-primary-red)'
            textColor='var(--text-primary-light)'
            borderRadius='50px'
            action={() => {
              handleSendFilter()
              selectPosition()
            }}
          />
        </div>
        <hr></hr>
      </section>
      <section>
        <FilterServicer />
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
        <Map />
      </section>
      <section className='section_card-offers'>
        <CardList offers={offers} />
      </section>
    </div>
  )
}

export default Home
