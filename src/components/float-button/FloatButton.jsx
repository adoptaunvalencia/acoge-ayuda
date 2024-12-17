import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FunctionContext } from '../../contexts/function.contexts/FunctionContext'
import { RefContext } from '../../contexts/ref.context/RefContext'
import Button from '../button/Button'
import './floatButton.css'
import lupa from '../../assets/icons/lupa.png'

const FloatButton = () => {
  const { scroll, homeRef } = useContext(RefContext)
  const { setModal } = useContext(FunctionContext)
  const location = useLocation()
  /**
   * icon={addIcon}
          iconSixe='40'
   */
  const handleSearchSection = () => {
    setTimeout(() => {
      scroll(homeRef)
    }, 300)
    setModal(true)
    setTimeout(() => {
      setModal(false)
    }, 2000)
  }
  return (
    <div className='float-button__container'>
      {location.pathname === '/' && (
        <Button
          icon={lupa}
          iconSixe='40'
          action={handleSearchSection}
          borderRadius='5px'
        />
      )}
      <Link to='create-offer'>
        <Button
          text='Quiero ayudar'
          textColor='var(--text-primary-light)'
          bgColor='var(--bg-primary-red)'
          padding='10px 10px'
          borderRadius='5px'
        />
      </Link>
    </div>
  )
}

export default FloatButton
