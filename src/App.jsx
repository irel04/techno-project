import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './hooks/useAuth'
import { ProtectedRoute } from './components/ProtectedRoutes'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={
          <ProtectedRoute>
            <div>Hello</div>
          </ProtectedRoute>
        }></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </AuthProvider>
  )
}

export default App