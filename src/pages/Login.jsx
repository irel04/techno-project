import React, { useState } from 'react'
import { supabase } from '../utils/supabase'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
    }



    return (
        <form className='rounded mt-20 container w-96 mx-auto bg-gray-300 flex flex-col py-14 items-center gap-8'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <h1 className='text-3xl font-bold'>Login</h1>
                <h2>Welcome to JB Manyakol</h2>
            </div>
            <div className='flex flex-col py-5 items-center gap-3'>
                <div>
                    <label className='m-2' htmlFor="username">Username: </label>
                    <input className='w-50' type="text" id='username' />
                </div>
                <div>
                    <label className='m-2' htmlFor="password">Password: </label>
                    <input className='w-50' type="text" id='password' />
                </div>
                <div className='flex flex-col items-center'>
                    <button className='mt-8 mb-2 w-36 rounded text-white bg-neutral-800' type='submit'>Continue</button>
                    <a className='text-sm'>Not yet registered? <span className='font-bold cursor-pointer'>Sign up here</span></a>
                </div>
            </div>
        </form>
    )
}

export default Login