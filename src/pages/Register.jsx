import React, { useEffect, useState } from 'react'
import arrowRightSvg from '/assets/arrow-right.svg'
import { supabase } from '../utils/supabase'

const Register = () => {

    const [lastName, setLastName] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [contactNo, setContactNo] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [newData, setNewData] = useState(null)


    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await supabase.auth.signUp({
                email: email,
                password: password
            })

            const form = {
                first_name: firstName,
                last_name: lastName,
                birthday: birthday,
                phone_number: contactNo
            }

             await supabase.from('users').insert([form])


        } catch (error) {
            console.error(error)
        }
    } 

    

    return (
        <form onSubmit={handleRegister} className='rounded mt-8 container w-96 mx-auto bg-gray-300 flex flex-col py-14 items-center gap-8'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <h1 className='text-3xl font-bold'>Register</h1>
                <h2>Be Our Premium <span className='text-rose-500 font-black'>Manyakol</span> Partner</h2>
            </div>
            <main className='flex flex-col items-center gap-3'>
                <div className='grid grid-cols-3'>
                    <label htmlFor="first_name">First Name </label>
                    <input className="p-1 col-span-2" onChange={(e)=> setFirstName(e.target.value)} required type="text" id="first_name" />
                </div>
                <div className='grid grid-cols-3'>
                    <label htmlFor="last_name">Last Name </label>
                    <input className="p-1 col-span-2" onChange={(e)=> setLastName(e.target.value)} required type="text" id="last_name" />
                </div>
                <div className='grid grid-cols-3'>
                    <label htmlFor="bday">Birthday </label>
                    <input className="p-1 col-span-2" onChange={(e)=> setBirthday(e.target.value)} type="text" id="birthday" />
                </div>
                <div className='grid grid-cols-3'>
                    <label htmlFor="phone_number">Contact No. </label>
                    <input className="p-1 col-span-2" onChange={(e)=> setContactNo(e.target.value)} type="text" id="phone_number" />
                </div>
                <div className='grid grid-cols-3'>
                    <label htmlFor="email">Email</label>
                    <input className="p-1 col-span-2" onChange={(e)=> setEmail(e.target.value)} required type="email" id="email" />
                </div>
                <div className='grid grid-cols-3'>
                    <label htmlFor="password">Password</label>
                    <input className="p-1 col-span-2" onChange={(e)=> setPassword(e.target.value)} required type="password" id="password" />
                </div>
            </main>
            <div className='flex flex-col items-center'>
                <button className='py-1 flex justify-center items-center mt-8 mb-2 w-36 rounded text-white bg-neutral-800' type='submit'>
                    <span >Proceed</span>
                    <img className='ml-2.5' src={arrowRightSvg} alt="" />
                </button>
                <a className='text-sm' href='https://www.facebook.com/jb.macacua' target='__blank'>Before proceeding, plese read our <span className='font-bold cursor-pointer'>Terms and Conditions</span></a>
            </div>
        </form>
    )
}

export default Register