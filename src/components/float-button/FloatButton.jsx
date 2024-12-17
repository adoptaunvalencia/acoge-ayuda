import Button from '../button/Button'
import './floatButton.css'
import addIcon from '../../assets/icons/add-icon.svg'
import { useContext } from 'react'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import { Link } from 'react-router-dom'

const FloatButton = () => {
  return (
    <div className='float-button__container'>
      <Link to='create-offer'>
        <Button
          icon={addIcon}
          iconSixe='40'
          bgColor='var(--bg-primary-red)'
          padding='10px 10px'
          borderRadius='100%'
        />
      </Link>
    </div>
  )
}

export default FloatButton
