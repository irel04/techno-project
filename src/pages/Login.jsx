import { useState } from "react";
import { supabase } from "../utils/supabase";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import Input from "../components/Input";
import Button from "../components/Button";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object({
  email: yup.string().required().max(50).label("Email"),
  password: yup.string().required().max(50).label("Password")
})


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initialized useForm 
  const { register, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  })

  return (
    <div className="flex flex-col justify-center items-center my-[5rem] md:my-[2rem]">
      <form
        className=" bg-white md:shadow-custom  rounded md:w-[30rem] p-5 flex flex-col gap-3"
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
          />

          <Input
            label="Password"
            placeholder=""
            type="password"
            name={"password"}
            register={register}
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
