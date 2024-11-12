import React, { useContext } from 'react'
import { ReducerContext } from '../../contexts/reducer.contexts/ReducerContext'
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
