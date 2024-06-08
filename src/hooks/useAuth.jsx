import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from "./useLocalStorage"
import { toast } from 'react-toastify';
import { supabase } from '../utils/supabase';
import { autoClose, spStorageKey } from '../utils/constant';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData] = useLocalStorage(spStorageKey, null)
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!userData?.expires_at)


    const login = async (data) => {
        const loading = toast.loading("Please wait...")
        try {

            
            const { error: signinError, data: userData } = await supabase.auth.signInWithPassword(data)
            const { data: userInfo } = await supabase.from("renters").select("*")
            console.log(userInfo);
            if (signinError) {
                throw signinError
            }

            toast.update(loading, {render: `Welcome back, `, isLoading: false, type: "success", autoClose:autoClose})
            setIsAuthenticated(true)
            

        } catch (error) {
            console.error(error.message)
            toast.update(loading, {render: error.message, isLoading: false, type: "error", autoClose:autoClose})
            setIsAuthenticated(false)
            throw error
        }
    }

    const logout = async () => {
        setIsAuthenticated(false)
    }

    const value = useMemo(() => (
        {
            isAuthenticated,
            logout,
            login
        }
    ))

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)