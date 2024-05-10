import React from 'react'
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {

  return (
    <>
      <BrowserRouter basename={'/'}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App