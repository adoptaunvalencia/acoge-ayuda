import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ReducerContext } from 'contexts/reducer.contexts/ReducerContext'
import { useFunctionContext } from 'contexts/function.contexts/FunctionContext'
import Footer from 'components/footer/Footer'
import Header from 'components/header/Header'
import FloatButton from 'components/float-button/FloatButton'
import WelcomePopUp from 'components/welcome-pop-up/WelcomePopUp'
import { Map } from 'components/map/Map'
import Modal from '../components/modal/Modal'

const Layout = () => {
  const {
    stateIsAuth: { user, isAuth }
  } = useContext(ReducerContext)
  const { showPopup, setShowPopup } = useFunctionContext()

  return (
    <>
      <header>
        <Header isAuth={isAuth} user={user} />
      </header>
      {isAuth && <FloatButton />}
      <main>
        <Outlet />
        {!isAuth && (
          <Modal
            isModalOpen={showPopup}
            handleCloseModal={() => setShowPopup(false)}
          >
            <WelcomePopUp />
          </Modal>
        )}
        <Map />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout
