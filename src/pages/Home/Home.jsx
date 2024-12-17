import { useContext, useEffect, useState } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import Button from '../../components/button/Button'
import FilterServicer from '../../components/filtro-services/FilterServices'
import { Map } from '../../components/map/Map'
import CardList from '../../components/card/CardList'
import './Home.css'
import Select from '../../components/select/Select'
import { RefContext } from '../../contexts/ref.context/RefContext'
import Spinner from '../../components/spinner/Spinner'
import Interiorista from '../../components/reconstruction-action/Interiorista'

const Home = () => {
  const {
    stateIsAuth: { isAuth }
  } = useContext(ReducerContext)
  const { scroll, homeRef, mapRef, myOfferRef } = useContext(RefContext)

  const {
    stateLoad: { load }
  } = useContext(ReducerContext)

  const {
    modal,
    showPopup,
    setShowPopup,
    filterOffers,
    userLocation,
    setUserLocation,
    getProfile,
    getOffers,
    handleFilterMyOffers,
    filteredOffers,
    setFilteredOffers,
    myOffers,
    setMyOffers,
    existToken
  } = useContext(FunctionContext)

  useEffect(() => {
    setTimeout(() => {
      scroll(homeRef)
    }, 500)
  }, [])

  const selectOptionsObject = {
    1: '1km',
    2: '2km',
    3: '3km'
  }

  const [activeType, setActiveType] = useState('')

  useEffect(() => {
    const fetchFilteredOffers = async () => {
      const result = await filterOffers(null, userLocation.radius, activeType)
      setFilteredOffers(result)
    }
    fetchFilteredOffers()
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
    const result = await filterOffers(null, userLocation.radius, activeType)

    setFilteredOffers(result)
  }

  const handleCategoryToggle = (category) => {
    setTimeout(() => {
      scroll(mapRef)
    }, 500)
    setActiveType((prevType) => (prevType === category ? '' : category))
  }

  useEffect(() => {
    handleSendFilter()
  }, [activeType])

  const filterMyOffers = () => {
    setTimeout(() => {
      scroll(myOfferRef)
    }, 500)
    handleFilterMyOffers()
  }

  return (
    <>
      {load && (
        <div className='spinner'>
          <Spinner />
        </div>
      )}
      <div ref={homeRef} className='home__container-sections fadeIn'>
        {/* <Interiorista /> */}
        {modal && <div className='modal-search filter'>
          <div className='modal-input'></div>
        </div>}
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
          <div className='home__content-buttons z-index-4002'>
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
        <section className='show z-index-4001'>
          <FilterServicer
            onCategoryToggle={handleCategoryToggle}
            activeTypes={activeType}
          />
        </section>

        <section ref={mapRef} className='section__map'>
          <Map offers={filteredOffers} />
        </section>
        {isAuth && (
          <section className='home__my-offers-btn'>
            <Button
              text='Mis ofertas de asistencia'
              bgColor='var(--bg-primary-red)'
              textColor='var(--text-primary-light)'
              borderRadius='var(--spacing-xs)'
              action={filterMyOffers}
            />
          </section>
        )}
        {myOffers.length > 0 && (
          <section ref={myOfferRef} className='home__my-offers fadeIn'>
            <h3>Mis Ofertas de asistencia</h3>
            <CardList activeType={activeType} offers={myOffers} />
            <Button
              text='Cerrar'
              bgColor='var(--bg-primary-red)'
              textColor='var(--text-primary-light)'
              borderRadius='var(--spacing-xs)'
              action={() => {
                setMyOffers([])
                setTimeout(() => {
                  scroll(mapRef)
                }, 500)
              }}
            />
            <hr></hr>
          </section>
        )}
        <section className='section_card-offers'>
          <CardList activeType={activeType} offers={filteredOffers} />
        </section>
      </div>
    </>
  )
}

export default Home
