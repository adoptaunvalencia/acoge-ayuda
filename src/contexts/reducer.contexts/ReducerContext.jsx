import { useReducer, createContext } from 'react'
import {
  stateLoader,
  initStateLoader
} from '../../reducers/loader.reducer/loader'

export const ReducerContext = createContext()

export const ReducerProvider = ({ children }) => {
  const [stateLoad, dispatchLoad] = useReducer(stateLoader, initStateLoader)

  return (
    <ReducerContext.Provider value={{ stateLoad, dispatchLoad }}>
      {children}
    </ReducerContext.Provider>
  )
}