import React from 'react'
import Button from '../components/Button'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Input from '../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from "../assets/logo.png";


const schema = yup.object({
    newPass: yup.string().required("New password is required").min(10, "Minimum 10 charcters").max(30, "Maximum character exceeded"),
    confirmPass: yup.string().required("Please confirm your password").min(10, "Minimum 10 charcters").max(30, "Maximum character exceeded").oneOf([yup.ref('newPass'), null], 'Passwords must match'),
})

const ResetPassword = () => {

    const { register, formState: { errors }, reset, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    })

    const handleChangePassword = async () => {
        console.log("Hi Raven")
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <form className='w-2/5' onSubmit={handleSubmit(handleChangePassword)}>
                {/* Logo */}
                <div className="flex gap-2 items-center justify-center">
                    <img
                        className="max-h-12"
                        src={logo}
                    />
                    <h1 className="text-3xl font-extrabold text-primary">
                        DormFinder.PH
                    </h1>
                </div>
                <h2 className='text-2xl font-semibold text-primary mt-12 mb-3'>Reset Password</h2>
                {/* <Input label={"New Password"}/> */}
                <Input label={"New Password"} type='password' register={register} name={"newPass"} maxLength={51} error={errors.newPass}/>
                <Input label={"Confirm Password"} type='password' register={register} name={"confirmPass"} maxLength={51} error={errors.confirmPass}/>
                {/* Submit Button */}
                <Button className="mt-3" color="primary" type="submit">Continue</Button>
            </form>
        </div>
    )
}

export default ResetPassword