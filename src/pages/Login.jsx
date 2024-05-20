import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import Input from "../components/Input";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const { data: userCredentials } = await toast.promise(
        supabase.auth.signInWithPassword({
          email: email,
          password: password,
        }),
        {
          pending: "Just a few seconds",
          success: "Login Success",
          error: "Invalid Email or Password",
        },
      );

      const { data: userData } = await toast.promise(
        supabase
          .from("users")
          .select("*")
          .eq("user_id", userCredentials.user.id),
        {
          pending: "Fetching Data",
          success: "User Load Successufully",
          error: "Something Went Wrong",
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={signIn}
        className=" bg-white shadow-custom rounded md:w-[30rem] p-5 flex flex-col gap-3"
      >
        {/* Logo */}
        <div className="flex gap-2 items-center justify-center">
          <img
            className="lg:h-12"
            src={logo}
          />
          <h1 className="text-3xl font-extrabold text-primary">
            DormFinder.PH
          </h1>
        </div>

        {/* Login with FB/GOOGLE */}
        <div className="flex flex-col gap-3">
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
        </div>

        <div className="flex flex-col gap-2">
          <Input
            label="Username"
            placeholder=""
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            placeholder=""
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          className="mt-3"
          color="primary"
        >
          Log In
        </Button>
        <p className="flex gap-1 justify-center">
          Not registered yet?{" "}
          <a
            href="/register"
            className="text-primary underline font-semibold"
          >
            Create an account here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
