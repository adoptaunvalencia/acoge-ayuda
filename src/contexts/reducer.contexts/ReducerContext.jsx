import { useReducer, createContext, useState } from 'react'
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
import { allCategories } from '../../utils/typesOffers'

export const ReducerContext = createContext()

export const ReducerProvider = ({ children }) => {
  const [activeTypes, setActiveTypes] = useState(allCategories)
  const [stateLoad, dispatchLoad] = useReducer(stateLoader, initStateLoader)
  const [stateIsAuth, dispatchIsAuth] = useReducer(stateAuth, initStateAuth)
  const [stateOffer, dispatchOffer] = useReducer(stateOffers, initStateOffers)

  return (
    <ReducerContext.Provider
      value={{
        activeTypes,
        setActiveTypes,
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
