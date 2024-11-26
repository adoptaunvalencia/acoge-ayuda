import { useContext, useEffect } from 'react'
import { RefContext } from '../../contexts/ref.context/RefContext'
import './HowItWork.css'

const HowItWork = () => {
  const { howItWork, scroll } = useContext(RefContext)
  useEffect(() => {
    setTimeout(() => {
      scroll(howItWork)
    }, 500)
  }, [])
  return (
    <div ref={howItWork} className='how-it-work__container'>
      <h3>¿Como funciona Adopta un Valenciano?</h3>
      <div>
        <video controls autoPlay loop style={{ borderRadius: '8px' }}>
          <source
            src='https://res.cloudinary.com/dylazw28d/video/upload/v1732042183/video%20oficial/d0xqg3djmf1w0a6acklh.mp4'
            type='video/mp4'
          />
        </video>
      </div>
    </div>
  )
}

export default HowItWork
