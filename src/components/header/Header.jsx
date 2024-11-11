import Button from '../button/Button'
import './Header.css'
import logo from '../../assets/icons/Logo.svg'
import { useContext } from 'react'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import { Link } from 'react-router-dom'

const Header = () => {
  const { handleLogin, handleRegister } = useContext(FunctionContext)
  return (
    <div className='header__container'>
      <div className='header__content'>
        <Link to='/'>
          <img src={logo} />
        </Link>
        <h1>
          Adopta un <br></br> Valenciano
        </h1>
      </div>
      <div className='header__content-btns'>
        <Button
          text='Login'
          bgColor='var(--bg-primary-red)'
          textColor='var(--text-primary-light)'
          borderRadius='var(--spacing-m)'
          action={handleLogin}
        />
        <Button
          text='Registro'
          textColor='var(--text-tertiary)'
          borderRadius='var(--spacing-m)'
          action={handleRegister}
        />
      </div>
    </div>
  )
}

export default Header
