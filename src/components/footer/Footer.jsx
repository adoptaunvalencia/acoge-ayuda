import React from 'react';
import './footer.css';
import Logo from '../../assets/images/logo.webp'

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-text'>
        <h4>Adopta un <br/>Valenciano</h4>
        <p>Conectamos a personas afectadas por el DANA con voluntarios dispuestos a ofrecer alojamiento, comida, higiene y ayuda con mascotas. Aquí nos apoyamos unos a otros.</p>
      </div>
      <img src={Logo} alt="Adopta un Valenciano Logo" />
    </div>
  )
}

export default Footer;