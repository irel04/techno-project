import React from 'react'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App