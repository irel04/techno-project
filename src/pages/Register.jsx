import { useEffect, useState } from "react";
import arrowRightSvg from "/assets/arrow-right.svg";
import { supabase } from "../utils/supabase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loading_message } from "../utils/messages";
import logo from "../assets/logo.png";
import Input from "../components/Input";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//yup validation

const schema = yup.object({
  firstName: yup.string().required().max(50).label("First Name"),
  lastName: yup.string().required().max(50).label("Last Name"),
  email: yup.string().max(50).required().label("Email"),
  bday: yup.date().required().label("Birthday"),
  contactNo: yup.string().max(12).label("Contact Number"),
  password: yup.string().required().label("Password").max(50)
})

const Register = () => {
  
  const { register, formState: { errors }, handleSubmit, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bday: "",
      contactNo: "",
      password: ""
    },
    mode: "all",
  })


  const handleRegister = () => {
    const data = {
      last_name: getValues('firstName'),
      first_name: getValues('lastName'),
      email: getValues('email'),
      contactNo: getValues('contactNo'),
      birthday: getValues('bday'),
      password: getValues('password')
    }

    console.log(data);
    
  }


  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white md:shadow-custom rounded md:w-[30rem] p-5 flex flex-col gap-3"
      >
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

        {/* Login with FB/GOOGLE */}
        {/* <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Login</h1>
          <Button color="white">
            <FaFacebook className="text-primary" />
            Sign Up with Facebook
          </Button>
          <Button color="white">
            <FcGoogle />
            Sign Up with Google
          </Button>
        </div> */}

        <div className="flex flex-col gap-2">
          <Input
            label="First Name"
            placeholder=""
            register={register}
            name={"firstName"}
            error={errors.firstName}
            maxLength={51}
            required={true}
          />

          <Input
            label="Last Name"
            register={register}
            name={"lastName"}
            required={true}
            maxLength={51}
            error={errors.lastName}
          />

          <Input
            label="Email"
            type="email"
            required={true}
            register={register}
            maxLength={51}
            name={"email"}
            error={errors.email}
          />

          <Input
            label="Birthday"
            type="date"
            required={true}
            register={register}
            name={"bday"}
            error={errors.bday}
          />

          <Input
            label="Contact Number"
            type="number"
            register={register}
            maxLength={12}
            name={"number"}
          />

          <Input
            label="Password"
            type="password"
            required={true}
            register={register}
            maxLength={51}
            name={"password"}
            error={errors.password}
          />
        </div>

        <p className="text-center">
          By signing up for a DormFinder Account, you agree to our{" "}
          <a
            href="/terms"
            className="text-primary underline font-semibold"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-primary underline font-semibold"
          >
            Privacy Policy
          </a>
          .
        </p>
        <Button
          className="mt-3"
          color="primary"
          type="submit"
        >
          Sign Up
        </Button>
        <p className="flex gap-1 justify-center">
          Already have an account?
          <a
            href="/register"
            className="text-primary underline font-semibold"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
