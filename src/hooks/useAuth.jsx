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
    const [userRole, setUserRole] = useLocalStorage("userRole", "anon")


    const navigate = useNavigate()

    const login = async (data) => {
        const loading = toast.loading("Please wait...");
        try {
            const { error: signinError, data: authData } = await supabase.auth.signInWithPassword(data);
            if (signinError) {
                throw signinError;
            }

            // Check if the user is a renter
            const { data: renterInfo } = await supabase.from("renters").select("*").eq("user_id", authData.user?.id);
            if (renterInfo.length > 0) {
                toast.update(loading, { render: `Welcome back, ${renterInfo[0]?.first_name}`, isLoading: false, type: "success", autoClose: autoClose });
                setUserRole("renter")
                setIsAuthenticated(true);
                navigate('/');
                return;
            }

            // Check if the user is a lease provider (owner)
            const { data: ownerInfo, error: ownerError } = await supabase.from("lease_providers").select("*").eq("user_id", authData.user?.id);
            if (ownerError) {
                throw ownerError;
            }
            if (ownerInfo.length > 0) {
                toast.update(loading, { render: `Welcome back, ${ownerInfo[0]?.first_name}`, isLoading: false, type: "success", autoClose: autoClose });
                setIsAuthenticated(true);
                setUserRole("owner")
                navigate('/business-side');
                return;
            }

            throw new Error('User not found in renters or lease providers.');
        } catch (error) {
            console.error(error.message);
            toast.update(loading, { render: error.message, isLoading: false, type: "error", autoClose: autoClose });
            setIsAuthenticated(false);
            throw error;
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
            setUserRole("anon")
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
            login,
            userRole
        }
    ));


     


    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);