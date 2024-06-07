import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../utils/supabase";

import logo from "../assets/logo.png";
import Input from "../components/Input";
import Button from "../components/Button";

function LoginPopup({ onClose }) {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        ref={popupRef}
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
