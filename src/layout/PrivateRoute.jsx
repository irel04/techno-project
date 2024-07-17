import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PrivateRoute = ({ redirectTo = "/", layout = "app" }) => {

    const { isAuthenticated, userRole } = useAuth()

    if (isAuthenticated) {
        if (userRole === "renter" && layout === "app") {
            return <Outlet />
        } else if (userRole === "owner" && layout === "business") {
            return <Outlet />
        } else {
            return <Navigate to={redirectTo} />
        }
    } else {
        return <Navigate to={redirectTo} />
    }

}

export default PrivateRoute