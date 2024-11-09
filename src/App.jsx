import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}></Route>
      <Route index element={<Home />}></Route>
      <Route
        path='dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  )
}

export default App
