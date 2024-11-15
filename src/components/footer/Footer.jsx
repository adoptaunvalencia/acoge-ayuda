import React, { useContext } from 'react'
import './footer.css'
import Logo from '../../assets/images/logo.webp'
import InstallApp from '../install-app/InstallApp'
import { Link } from 'react-router-dom'
import { RefContext } from '../../contexts/ref.context/RefContext'

const Footer = () => {
  const { scroll, headerRef } = useContext(RefContext)
  const handleScroll = () => {
    scroll(headerRef)
  }
  return (
    <div className='footer-container'>
      <div className='footer-text'>
        <h4>
          Adopta un <br />
          <span>Valenciano</span>
        </h4>
        <p>
          Conectamos a personas afectadas por el DANA con voluntarios dispuestos
          a ofrecer alojamiento, comida, higiene y ayuda con mascotas. Aquí nos
          apoyamos unos a otros.
        </p>
        <div className='footer-content-link'>
          <InstallApp />
          <Link to='privacy-policy'>Politicas de privacidad</Link>
          <Link to='collaborators'>Colaboradores❤️</Link>
        </div>
      </div>
      <div className='footer-content-img'>
        <img
          style={{ cursor: 'pointer' }}
          src={Logo}
          alt='Adopta un Valenciano Logo'
          onClick={handleScroll}
        />
      </div>
    </div>
  )
}

export default Footer
