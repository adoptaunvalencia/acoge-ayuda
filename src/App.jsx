import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}></Route>
      <Route index element={<Home />}></Route>
    </Routes>
  )
}

export default App
