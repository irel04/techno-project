import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const PublicOnlyRoute = ({ redirectTo= "/" }) => {

    const { isAuthenticated } = useAuth()

    console.log(isAuthenticated);
 
    return isAuthenticated ? <Navigate to={redirectTo}/> : <Outlet/>
}

export default PublicOnlyRoute