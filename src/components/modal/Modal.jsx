import { useEffect, useState } from 'react'
import Button from '../button/Button'
import './Modal.css'

const Modal = ({ isModalOpen, handleCloseModal, children }) => {
  const [isMounted, setIsMounted] = useState(isModalOpen)
  useEffect(() => {
    if (isModalOpen) {
      setIsMounted(true)
    }
  }, [isModalOpen])

  const handleTransitionEnd = () => {
    if (!isModalOpen) {
      setIsMounted(false)
    }
  }

  const handleScreenToClose = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  return (
    isMounted && (
      <div
        className={`filter modal-overlay ${isModalOpen ? 'open' : 'closed'}`}
        onClick={handleScreenToClose}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className='modal-close'>
          <Button
            text='❌'
            borderRadius='50%'
            padding='10px 10px'
            action={handleCloseModal}
          />
        </div>
        {children}
      </div>
    )
  )
}
export default Modal
