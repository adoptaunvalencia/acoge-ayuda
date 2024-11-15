import Button from '../button/Button'
import './Modal.css'

const Modal = ({ isModalOpen, handleCloseModal, children }) => {
  const handleScreenToClose = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  return (
    <div
      className={`filter modal-overlay ${isModalOpen ? 'open' : 'closed'}`}
      onClick={(e) => {
        handleScreenToClose(e)
      }}
    >
      <div className='modal-close'>
        <Button
          text='❌'
          borderRadius='50%'
          padding='10px 10px'
          action={handleCloseModal}
        />
      </div>{' '}
      {children}
    </div>
  )
}

export default Modal
