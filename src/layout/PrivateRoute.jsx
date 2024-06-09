import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PrivateRoute = ({ redirectTo = "/" }) => {

    const { isAuthenticated } = useAuth()

    return isAuthenticated ? <Outlet/> : <Navigate to={redirectTo}/>
}

export default PrivateRoute