import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Register from './pages/Auth/register/Register'
import Login from './pages/Auth/login/Login'
import Forgot from './pages/Auth/forgot/Forgot'
import SendCode from './pages/Auth/sendCode/SendCode'
import NewPassword from './pages/Auth/new-password/NewPassword'
import CreateOffer from './pages/create-offer/CreateOffer'
import Collaborator from './pages/collaborators/Collaborator'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot-password' element={<Forgot />} />
        <Route path='login' element={<Login />} />
        <Route path='send-code' element={<SendCode />} />
        <Route path='new-password' element={<NewPassword />} />
        {/* <Route
          path='dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path='create-offer'
          element={
            <ProtectedRoute>
              <CreateOffer />
            </ProtectedRoute>
          }
        />
        <Route path='collaborators' element={<Collaborator />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
