import React from 'react'
import './footer.css'
import Logo from '../../assets/images/logo.webp'
import InstallApp from '../install-app/InstallApp'
import { Link } from 'react-router-dom'

const Footer = () => {
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
        <InstallApp />
        <Link to='collaborators'>Colaboradores❤️</Link>
      </div>
      <div className='footer-content-img'>
        <img src={Logo} alt='Adopta un Valenciano Logo' />
      </div>
    </div>
  )
}

export default Footer
