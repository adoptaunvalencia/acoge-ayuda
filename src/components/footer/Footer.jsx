import React, { useContext } from 'react'
import './footer.css'
import Logo from '../../assets/images/logo.webp'
import InstallApp from '../install-app/InstallApp'
import { Link } from 'react-router-dom'
import { RefContext } from '../../contexts/ref.context/RefContext'
import logo from '../../assets/icons/Logo.svg'
import linkedin from '../../assets/icons/linkedin-icon.svg'
import instagram from '../../assets/icons/ig.png'
import whatsapp from '../../assets/icons/ws.png'
import gmail from '../../assets/icons/gmail.png'

const Footer = () => {
  const { scroll, headerRef } = useContext(RefContext)
  const handleScroll = () => {
    scroll(headerRef)
  }
  return (
    <div className='footer-container'>
      <div className='footer-text'>
        <div className='header__content'>
          <Link to='/'>
            <img src={logo} alt='Logo' width='80' />
          </Link>
          <h1>
            Adopta un <br></br> Valenciano
          </h1>
        </div>
        <p>
          Nos dedicamos a conectar a personas en situación de vulnerabilidad con
          voluntarios comprometidos a brindarles apoyo en los momentos más
          difíciles. A través de nuestra red solidaria, facilitamos el acceso a
          alojamiento, alimentos, productos de higiene y ayuda con el cuidado de
          mascotas, proporcionando alivio y esperanza en tiempos de necesidad.
          <br></br>
          <br></br>
          Nuestro objetivo es fomentar un espacio de colaboración y empatía,
          donde cada gesto de solidaridad, por pequeño que sea, tenga un impacto
          significativo. Creemos en el poder de la comunidad y en la importancia
          de unir esfuerzos para superar juntos cualquier adversidad,
          construyendo un futuro más fuerte y lleno de posibilidades para todos.
        </p>
        <div className='footer-content-link'>
          <div>
            <h5>Enlaces de interés:</h5>
            <Link to='privacy-policy'>Politicas de privacidad🤓</Link>
            <Link to='how-it-work'>Como funciona❤️</Link>
            {/* <a
              href='https://gofund.me/99592a71'
              rel='noopener noreferrer'
              target='_blank'
            >
              Apoyanos👏🏻
            </a> */}
            <Link to='collaborators'>Colaboradores🔥</Link>
            {/* <InstallApp /> */}
          </div>
          <div>
            <a
              href='mailto:adoptaunvalencia@gmail.com'
              title='adoptaunvalencia@gmail.com'
            >
              <img src={gmail} alt='Correo electrónico' width='24' />
            </a>
            <a
              href='https://www.linkedin.com/in/adopta-un-valenciano/"'
              rel='noopener noreferrer'
              target='_blank'
            >
              <img src={linkedin} alt='linkedin' width='24' />
            </a>
            <a
              href='https://www.instagram.com/adopta_un_valenciano/'
              rel='noopener noreferrer'
              target='_blank'
            >
              <img src={instagram} alt='instagram' width='24' />
            </a>
            <a
              href='https://whatsapp.com/channel/0029VaspbP9Chq6IV9wCQW0u'
              rel='noopener noreferrer'
              target='_blank'
            >
              <img src={whatsapp} alt='whatsapp' width='24' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
