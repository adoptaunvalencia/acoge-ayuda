import Button from '../button/Button'
import logo from '../../assets/icons/Logo.svg'
import './Header.css'

/**
 * 
 *  <Button
  text='Get Offers'
  icon={myIcon}
  bgColor='#FF5733'
  textColor='white'
  action={getOffers}
/>
 */

const handleCreateHelp = () => {
  console.log('Hola');
  
}

const Header = () => {
  return (
    <div>
      <div>
        <img src={logo} width='57' />
        <h1>Adopta un <br></br> Valenciano</h1>
      </div>
      <div>
        <Button text='Publicar ayuda' action={handleCreateHelp} />
      </div>
    </div>
  )
}

export default Header
