import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ReducerContext } from 'contexts/reducer.contexts/ReducerContext'
import Footer from 'components/footer/Footer'
import Header from 'components/header/Header'
import FloatButton from 'components/float-button/FloatButton'
import Spinner from '../components/spinner/Spinner'

const Layout = () => {
  const {
    stateIsAuth: { user, isAuth },
    stateLoad: { load }
  } = useContext(ReducerContext)

  return (
    <>
      {load ? (
        <div className='spinner'>
          <Spinner />
        </div>
      ) : (
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
      )}
    </>
  )
}

export default Layout
