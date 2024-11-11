import React, { useContext } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
import Home from '../../pages/Home/Home'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const {
    stateIsAuth: { isAuth }
  } = useContext(ReducerContext)

  const navigate = useNavigate()

  if (!isAuth) {
    navigate('../')
     
  }

  return <div>{children}</div>
}

export default ProtectedRoute
