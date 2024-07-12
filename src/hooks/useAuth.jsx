import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from "./useLocalStorage"
import { toast } from 'react-toastify';
import { supabase } from '../utils/supabase';
import { autoClose, spStorageKey } from '../utils/constant';
import { customToastParameter } from '../utils/helper';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData] = useLocalStorage(spStorageKey, null)
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!userData?.expires_at)

    const navigate = useNavigate()

    const login = async (data) => {
        const loading = toast.loading("Please wait...")
        try {

            
            const { error: signinError, data: userData } = await supabase.auth.signInWithPassword(data)
            const { data: userInfo } = await supabase.from("renters").select("*").eq("user_id", userData.user?.id)
            if (signinError) {
                throw signinError
            }

            toast.update(loading, {render: `Welcome back, ${userInfo[0]?.first_name} `, isLoading: false, type: "success", autoClose:autoClose})
            setIsAuthenticated(true)

        } catch (error) {
            console.error(error.message)
            toast.update(loading, {render: error.message, isLoading: false, type: "error", autoClose:autoClose})
            setIsAuthenticated(false)
            throw error
        }
    }

    const logout = async () => {
        const loading = toast.loading("Logging out...")
        try {
            const { error } = await supabase.auth.signOut()

            if(error){
                throw error
            }
            
            
            setIsAuthenticated(false)
            toast.update(loading, customToastParameter("Logged out", "info"))
            navigate("/")
            
        } catch (error) {  
            console.error(error)
            toast.update(loading, customToastParameter(error.message, "error"))
        }
    }

    const value = useMemo(() => (
        {
            isAuthenticated,
            logout,
            login
        }
    ))


     // Check token expiration
     useEffect(() => {
        const expiredAt = userData?.expires_at 
        const currentDate = Math.floor(Date.now() / 1000);
        
        if(currentDate>expiredAt){
            logout()
            setIsAuthenticated(false)
        }

        console.log(currentDate>expiredAt)
        

    }, [userData, isAuthenticated])

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)