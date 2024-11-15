import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import { RefContext } from '../../contexts/ref.context/RefContext'
import Button from '../button/Button'
import logo from '../../assets/icons/Logo.svg'
import './Header.css'

const Header = () => {
  const { handleLogin, handleRegister, handleLogout } =
    useContext(FunctionContext)
  const {
    stateIsAuth: { user, isAuth }
  } = useContext(ReducerContext)
  const { scroll, headerRef } = useContext(RefContext)

  useEffect(() => {
    setTimeout(() => {
      scroll(headerRef)
    }, 500);
  },[])

  return (
    <div ref={headerRef} className='header__container fadeIn'>
      <div className='header__content'>
        <Link to='/'>
          <img src={logo} alt='Logo' />
        </Link>
        <h1>
          Adopta un <br></br> Valenciano
        </h1>
      </div>
      {isAuth ? (
        <div className='header__contentinfo-user'>
          <div>
            <img src={user.avatar} width='40' alt={user.name} />
            <p>
              <span>{user.name}</span>
            </p>
          </div>
          <Button
            text='Cerrar sesión'
            bgColor='var(--bg-primary-red)'
            textColor='var(--text-primary-light)'
            borderRadius='var(--spacing-m)'
            action={handleLogout}
          />
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default Header
