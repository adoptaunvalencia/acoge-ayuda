import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ReducerContext } from '../contexts/reducer.contexts/ReducerContext'

const Layout = () => {
  const {
    stateIsAuth: { user, isAuth }
  } = useContext(ReducerContext)
  console.log(user)
  console.log(isAuth)

  return <div>{Outlet}</div>
}

export default Layout
