import React, { useEffect, useState } from "react";
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

const Register = () => {
  const [lastName, setLastName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [contactNo, setContactNo] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [newData, setNewData] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await toast.promise(
        supabase.auth.signUp({
          email: email,
          password: password,
        }),
        loading_message("Authentication Created"),
      );

      const form = {
        first_name: firstName,
        last_name: lastName,
        birthday: birthday,
        phone_number: contactNo,
        user_id: data.user.id,
      };

      await toast.promise(
        supabase.from("users").insert([form]),
        loading_message("Account Created"),
      );

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleRegister}
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
            required
            placeholder=""
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Input
            label="Last Name"
            required
            placeholder=""
            onChange={(e) => setLastName(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            required
            placeholder=""
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Birthday"
            type="date"
            required
            placeholder=""
            onChange={(e) => setBirthday(e.target.value)}
          />

          <Input
            label="Contact Number"
            type="number"
            required
            placeholder=""
            onChange={(e) => setContactNo(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            required
            placeholder=""
            onChange={(e) => setPassword(e.target.value)}
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
