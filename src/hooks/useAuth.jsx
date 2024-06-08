import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from "./useLocalStorage"
import { toast } from 'react-toastify';
import { supabase } from '../utils/supabase';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData] = useLocalStorage("sb-cptupyrencyekssnbqdn-auth-token", null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = async (data, e) => {
        try {

            const loading = toast.loading("Please wait...")
            const { error: signinError, data: userData } = await supabase.auth.signInWithPassword(data)


            if (signinError) {
                toast.dismiss(loading)
                throw signinError
            }

            toast.dismiss(loading)
            toast.success("Login Successfully")
            setIsAuthenticated(true)
            

        } catch (error) {
            console.error(error.message)
            toast.error(error.message)
            setIsAuthenticated(false)
        }
    }

    const logout = async () => {
        setIsAuthenticated(false)
    }

    const value = {
        isAuthenticated,
        logout,
        login
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)