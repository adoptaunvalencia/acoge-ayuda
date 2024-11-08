import { useReducer, createContext } from 'react'
import {
  stateLoader,
  initStateLoader
} from '../../reducers/loader.reducer/loader'
import {
  stateAuth,
  initStateAuth
} from '../../reducers/auth.reducer/auth.reducer'
import {
  initStateOffers,
  stateOffers
} from '../../reducers/offers.reducer/offer.reducer'

export const ReducerContext = createContext()

export const ReducerProvider = ({ children }) => {
  const [stateLoad, dispatchLoad] = useReducer(stateLoader, initStateLoader)
  const [stateIsAuth, dispatchIsAuth] = useReducer(stateAuth, initStateAuth)
  const [stateOffer, dispatchOffer] = useReducer(stateOffers, initStateOffers)

  return (
    <ReducerContext.Provider
      value={{
        stateLoad,
        dispatchLoad,
        stateIsAuth,
        dispatchIsAuth,
        stateOffer,
        dispatchOffer
      }}
    >
      {children}
    </ReducerContext.Provider>
  )
}
