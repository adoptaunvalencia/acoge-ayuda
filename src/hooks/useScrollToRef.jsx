import { useCallback } from 'react'

const useScrollToRef = () => {
  const scrollToRef = useCallback((ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return scrollToRef
}

export default useScrollToRef
