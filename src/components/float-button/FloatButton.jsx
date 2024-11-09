import Button from '../button/Button'
import './floatButton.css'
import addIcon from '../../assets/icons/add-icon.svg'

const FloatButton = () => {
  return (
    <div className='float-button__container'>
      <Button
        icon={addIcon}
        bgColor='var(--bg-primary-red)'
        padding='10px 10px'
        borderRadius='100%'
      />
    </div>
  )
}

export default FloatButton
