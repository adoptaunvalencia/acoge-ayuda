import { useContext, useEffect } from 'react'
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
    stateOffer:{offer, offers}
  } = useContext(ReducerContext)
  const { showPopup, setShowPopup } = useContext(FunctionContext)

  const selectOptionsObject = {
    option1: 'Option1',
    option2: 'Option2'
  }

  const handleChangeSelect = (value) => {
    console.log(value)
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
            label='Nombre'
            name='name'
            id='name'
            tooltip='Ingrese su nombre'
            defaultOption={true}
            options={selectOptionsObject}
            onChange={handleChangeSelect}
          />
          <Button
            text='Ubicación'
            bgColor='#FFFFFF'
            borderRadius='var(--spacing-xs)'
          />
          <Button
            text='Distancia máxima'
            bgColor='#FFFFFF'
            borderRadius='var(--spacing-xs)'
          />
          <Button
            text='Buscar'
            bgColor='var(--bg-primary-red)'
            textColor='var(--text-primary-light)'
            borderRadius='50px'
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
        <CardList isAuth={isAuth} user={user} />
      </section>
    </div>
  )
}

export default Home
