import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import Button from '../button/Button'
import './Interiorista.css'
import iconiea from '/logorecact.webp'

const Interiorista = () => {
  const {
    stateIsAuth: { isAuth }
  } = useContext(ReducerContext)
  return (
    <section className='section-reconstruction-action'>
      <div className='section-reconstruction-action-img'>
        <img src='/banner-recact.webp' alt='banner interioristas en acción' />
      </div>
      <div className='section-reconstruction-action-container'>
        <img src={iconiea} alt='icono interioristas en acción' />
        <article>
          <h1>Valencia</h1>
          <h2>Reconstrucción en acción</h2>
          <p>¡Atención, habitantes de zonas afectadas!</p>
        </article>
        {isAuth && (
          <a
            href='https://interioristasenaccion.com/que-hacemos'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button
              text='Saber más..'
              fontSize='14px'
              bgColor='var(--bg-primary-red)'
              textColor='var(--text-primary-light)'
              borderRadius='5px'
            />
          </a>
        )}
        <div></div>
      </div>
    </section>
  )
}

export default Interiorista
