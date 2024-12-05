import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('../')
    }, 300)
    return () => clearTimeout(timer)
  }, [navigate])
  return
}

export default NotFound