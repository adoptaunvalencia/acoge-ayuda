import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ReducerContext } from 'contexts/reducer.contexts/ReducerContext'
import Footer from 'components/footer/Footer'
import Header from 'components/header/Header'

const Layout = () => {
  const {
    stateIsAuth: { user, isAuth }
  } = useContext(ReducerContext)
  console.log(user)
  console.log(isAuth)

  return (
    <main>
      <Header isAuth={isAuth} user={user} />
      <Outlet />
      <Footer />
    </main>
  )
}

export default Layout