import { createContext, useRef } from 'react'
import useScrollToRef from '../../hooks/useScrollToRef'

export const RefContext = createContext()

export const RefProvider = ({ children }) => {
  const headerRef = useRef(null)
  const loginRef = useRef(null)
  const forgotRef = useRef(null)
  const newPasswordRef = useRef(null)
  const registerRef = useRef(null)
  const sendCodeRef = useRef(null)
  const homeRef = useRef(null)
  const createOfferRef = useRef(null)
  const privacyRef = useRef(null)
  const mapRef = useRef(null)
  const collaboratoresRef = useRef(null)
  const myOfferRef = useRef(null)
  const howItWork = useRef(null)
  const cookiesSettings = useRef(null)
  

  const scroll = useScrollToRef()
  return (
    <RefContext.Provider
      value={{
        scroll,
        headerRef,
        loginRef,
        forgotRef,
        sendCodeRef,
        newPasswordRef,
        registerRef,
        homeRef,
        createOfferRef,
        privacyRef,
        mapRef,
        collaboratoresRef,
        myOfferRef,
        howItWork,
        cookiesSettings
      }}
    >
      {children}
    </RefContext.Provider>
  )
}
