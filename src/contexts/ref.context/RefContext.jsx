import { createContext } from 'react'

export const RefContext = createContext()

export const RefProvider = ({ children }) => {
  return <RefContext.Provider value={{}}>{children}</RefContext.Provider>
}
