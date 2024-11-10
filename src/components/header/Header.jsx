import Button from '../button/Button'
import logo from '../../assets/icons/Logo.svg'
import './Header.css'

const handleCreateHelp = () => {
 
  console.log('Hola');
  
}

const Header = () => {
  return (
    <div className='header__container'>
      <div>
        <img src={logo} width='57' />
        <h1>Adopta un <br></br> Valenciano</h1>
      </div>
      <div>
        <Button text='Login' bgColor='var(--bg-light-red)' textColor='var(--text-primary-light)' action={handleCreateHelp} />
        <Button text='Registro' textColor='var(--text-tertiary)' action={handleCreateHelp} />
      </div>
    </div>
  )
}

export default Header
