import { useState } from "react";
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

const OwnerRegister = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessContact, setBusinessContact] = useState("");
  const [ownerType, setOwnerType] = useState("individual");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await toast.promise(
        supabase.auth.signUp({
          email: email,
          password: password,
        }),
        loading_message("Creating Authentication..."),
      );

      if (error) throw error;

      const form = {
        first_name: firstName,
        last_name: lastName,
        birthday: birthday,
        phone_number: contactNo,
        email: email,
        business_name: businessName,
        business_address: businessAddress,
        business_contact: businessContact,
        owner_type: ownerType,
        user_id: data.user.id,
      };

      await toast.promise(
        supabase.from("owners").insert([form]),
        loading_message("Creating Account..."),
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
        onSubmit={handleRegister}
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
        <label className="text-l font-semibold text-primary">Owner Type</label>
        <select
          className="w-full rounded border border-[#6F7070] p-2 bg-transparent  text-sm pr-5"
          value={ownerType}
          onChange={(e) => setOwnerType(e.target.value)}
          required
        >
          <option value="individual">Individual</option>
          <option value="company">Company</option>
        </select>

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
            type="tel"
            required
            placeholder=""
            onChange={(e) => setContactNo(e.target.value)}
          />

          <Input
            label="Business Name"
            required
            placeholder=""
            onChange={(e) => setBusinessName(e.target.value)}
          />

          <Input
            label="Business Address"
            required
            placeholder=""
            onChange={(e) => setBusinessAddress(e.target.value)}
          />

          <Input
            label="Business Contact"
            type="tel"
            required
            placeholder=""
            onChange={(e) => setBusinessContact(e.target.value)}
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
            href="/login"
            className="text-primary underline font-semibold"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default OwnerRegister;
