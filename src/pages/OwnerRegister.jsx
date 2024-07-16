import { useState } from "react";
import { supabase } from "../utils/supabase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { customToastParameter, loading_message } from "../utils/helper";
import logo from "../assets/logo.png";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import React from 'react';
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  firstName: yup.string().required().max(50).label("First Name"),
  lastName: yup.string().required().max(50).label("Last Name"),
  email: yup.string().max(50).required().label("Email"),
  bday: yup.string().required().label("Birthday"),
  number: yup.string().max(12).label("Contact Number"),
  province: yup.string().required().max(50).label("Province"),
  city: yup.string().required().max(50).label("City"),
  barangay: yup.string().required().max(50).label("Barangay"),
  street: yup.string().max(50).label("Street"),
  password: yup.string().required().label("Password").max(50)
})

const OwnerRegister = () => {
  const navigate = useNavigate();
 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });


  const handleOwnerRegisteration = async (data) => {
    const loading = toast.loading("Please wait...")
    
    try {
      const { data: leaseProviders, error: providerErrors } = await supabase.from("lease_providers").select("email").eq("email", data.email)

      if(providerErrors || leaseProviders.length){
        throw providerErrors.message || "Email is already used"
      }

      const { data: signup, error: signupError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      })

      if(signupError){
        throw signupError.message
      }

      const { data: createdProvider, error: creatingProvidersError } = await supabase.from("lease_providers").insert({
        last_name: data.lastName,
        first_name: data.firstName,
        birthday: data.bday,
        contact_no: data.number,
        email: data.email,
        user_id: signup.user.id
      }).select("id")

      if(creatingProvidersError){
        throw creatingProvidersError.message
      }


      const { error: addressError } = await supabase.from("addresses_providers").insert({
        provider_id: createdProvider[0].id,
        province: data.province,
        city: data.city,
        barangay: data.barangay,
        street: data.street
      }) 

      if(addressError){
        throw addressError.message
      }


      toast.update(loading, customToastParameter("Registration Successful", "success"))
      navigate("/")

    } catch (error) {
      console.error(error)
      toast.update(loading, customToastParameter(error, "error"))
    }
  }
  

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(handleOwnerRegisteration)}
        className="bg-white md:shadow-custom rounded md:w-[30rem] p-5 flex flex-col gap-3"
      >
        {/* Logo */}
        <div className="flex gap-2 items-center justify-center">
          <img
            className="max-h-12"
            src={logo}
            alt="Logo"
          />
          <h1 className="text-3xl font-extrabold text-primary">
            DormFinder.PH
          </h1>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-2">
          <Input
            label="First Name"
            type="text"
            required
            register={register}
            name="firstName"
            error={errors.firstName}
          />

          <Input
            label="Last Name"
            type="text"
            required
            register={register}
            name="lastName"
            error={errors.lastName}
          />

          <Input
            label="Email"
            type="email"
            required
            register={register}
            name="email"
            error={errors.email}
          />

          <Input
            label="Birthday"
            type="date"
            register={register}
            name="bday"
            error={errors.birthday}
          />

          <Input
            label="Contact Number"
            type="text"
            register={register}
            name="number"
            error={errors.contactNo}
          />

          <Input
            label="Province"
            type="text"
            required
            register={register}
            name="province"
            error={errors.province}
          />

          <Input
            label="City"
            type="text"
            required
            register={register}
            name="city"
            error={errors.city}
          />

          <Input
            label="Barangay"
            type="text"
            required
            register={register}
            name="barangay"
            error={errors.barangay}
          />

          <Input
            label="Street"
            type="text"
            // required
            register={register}
            name="street"
            error={errors.street}
          />

          <Input
            label="Password"
            type="password"
            required
            register={register}
            name="password"
            error={errors.password}
          />
        </div>

        <p className="text-center">
          By signing up for a DormFinder Account, you agree to our{" "}
          <a href="/terms" className="text-primary underline font-semibold">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary underline font-semibold">
            Privacy Policy
          </a>
          .
        </p>
        <Button className="mt-3" color="primary" type="submit">
          Sign Up
        </Button>
        <p className="flex gap-1 justify-center">
          Already have an account?{" "}
          <a href="/login" className="text-primary underline font-semibold">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default OwnerRegister;
