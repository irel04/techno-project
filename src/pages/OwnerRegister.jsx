import { useState } from "react";
import { supabase } from "../utils/supabase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loading_message } from "../utils/helper";
import logo from "../assets/logo.png";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import React from 'react';

const OwnerRegister = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try {
      const { data, error } = await toast.promise(
        supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        }),
        loading_message("Creating Authentication...")
      );

      if (error) throw error;

      const providerData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        birthday: formData.birthday,
        contact_no: formData.contactNo,
        email: formData.email,
        user_id: data.user.id,
      };

      await toast.promise(
        supabase.from("lease_providers").insert([providerData]),
        loading_message("Creating Account...")
      );

      const addressData = {
        province: formData.province,
        city: formData.city,
        barangay: formData.barangay,
        street: formData.street,
        user_id: data.user.id,
      };

      await toast.promise(
        supabase.from("addresses_property").insert([addressData]),
        loading_message("Creating Address...")
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            required
            register={register}
            name="birthday"
            error={errors.birthday}
          />

          <Input
            label="Contact Number"
            type="tel"
            required
            register={register}
            name="contactNo"
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
            required
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
