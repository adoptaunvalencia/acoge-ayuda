import Button from '../../components/button/Button'
import FilterServicer from '../../components/filtro-services/FilterServices'
import './Home.css'

const Home = () => {
  return (
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
        <Button text='Ubicación' bgColor="#FFFFFF" borderRadius='var(--spacing-m)' />
        <Button text='Distancia máxima' bgColor="#FFFFFF" borderRadius='var(--spacing-m)' />
        <Button
          text='Buscar'
          bgColor='var(--bg-primary-red)'
          textColor='var(--text-primary-light)'
          borderRadius='50px'
        />
      </div>
      <div>
        <FilterServicer />
      </div>
    </section>
  )
}

export default Home
