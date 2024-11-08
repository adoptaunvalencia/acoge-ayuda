import React from 'react';
import './footer.css';
import Logo from '../../assets/images/logo.webp'

const Footer = () => {
  return (
    <footer>
      <div className='footer-text'>
        <h2>Adopta un <br/>Valenciano</h2>
        <h4>Conectamos a personas afectadas por el DANA con voluntarios dispuestos a ofrecer alojamiento, comida, higiene y ayuda con mascotas. Aquí nos apoyamos unos a otros.</h4>
      </div>
      <img src={Logo} alt="Adopta un Valenciano Logo" />
    </footer>
  )
}

export default Footer;