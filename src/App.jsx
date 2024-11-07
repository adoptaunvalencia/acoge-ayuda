import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}></Route>
    </Routes>
  )
}

export default App
