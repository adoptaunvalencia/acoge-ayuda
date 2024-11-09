import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ReducerContext } from 'contexts/reducer.contexts/ReducerContext'
import Footer from 'components/footer/Footer'
import Header from 'components/header/Header'
import FloatButton from '../components/float-button/FloatButton'

const Layout = () => {
  const {
    stateIsAuth: { user, isAuth }
  } = useContext(ReducerContext)
  console.log(user)
  console.log(isAuth)

  return (
    <>
      <header>
        <Header isAuth={isAuth} user={user} />
      </header>
      {isAuth && <FloatButton />}
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout
