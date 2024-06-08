import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../utils/supabase";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../assets/logo.png";
import Input from "../components/Input";
import Button from "../components/Button";

const schema = yup.object({
  email: yup.string().required().max(50).label("Email"),
  password: yup.string().required().max(50).label("Password")
})

function LoginPopup({ onClose }) {
  
  // Initialized useForm 
  const { register, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  })

  // this block is For popping up 
  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  // Functions for sign in 
  const handleSignIn = async (data, e)  => {
    try { 

      const loading = toast.loading("Please wait...")
      const { error: signinError, data: userData } = await supabase.auth.signInWithPassword(data)


      if(signinError){
        toast.dismiss(loading)
        throw signinError
      }

      toast.dismiss(loading)
      toast.success("Login Successfully")
      console.log(userData);

    } catch (error) {
      console.error(error.message)
      toast.error(error.message)
      // onClose(true)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        ref={popupRef}
        // onSubmit={handleSubmit(handleSignIn)}
        className="bg-white rounded p-5 flex flex-col gap-3 w-full md:max-w-[30rem] mx-6"
      >
        <div className="flex gap-2 items-center justify-center">
          <img
            className="max-h-12"
            src={logo}
          />
          <h1 className="text-3xl font-extrabold text-primary">
            DormFinder.PH
          </h1>
        </div>

        {/* Login with FB/GOOGLE */}
        {/* <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Login</h1>
          <Button color="white">
            <FaFacebook className="text-primary" />
            Login in with Facebook
          </Button>
          <Button color="white">
            <FcGoogle />
            Login in with Google
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          <hr className=" w-full border border-1 border-[#6F7070]" />
          <p className="text-[#6f7070]">or</p>
          <hr className=" w-full border border-1 border-[#6F7070]" />
        </div> */}

        <div className="flex flex-col gap-2">
          <Input
            label="Username"
            placeholder=""
            register={register}
            name={"email"}
            error={errors.email}
          />

          <Input
            label="Password"
            placeholder=""
            type="password"
            name={"password"}
            error={errors.password}
            register={register}
          />
        </div>

        <Button
          className="mt-3"
          color="primary"
        >
          Log In
        </Button>
        <p className="text-text-color flex gap-1 justify-center">
          Not registered yet?
          <a
            href="/account"
            className="text-primary underline font-semibold"
          >
            Create an account here
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPopup;
