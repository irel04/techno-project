import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from 'yup';
import logo from "../assets/logo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { supabase } from "../utils/supabase";
import { autoClose } from "../utils/constant";

// yup validation schema, we'll use this as resolver along with useForm hook
// the name of the object inside should be the same on what you are putting inside the <Input/> component
const schema = yup.object({
  firstName: yup.string().required().max(50).label("First Name"),
  lastName: yup.string().required().max(50).label("Last Name"),
  email: yup.string().max(50).required().label("Email"),
  bday: yup.string().required().label("Birthday"),
  number: yup.string().max(12).label("Contact Number"),
  password: yup.string().required().label("Password").max(50)
})

// Default value template
const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  bday: "",
  number: "",
  password: ""
}

const Register = ( ) => {

  const navigate = useNavigate()

  // Initialized useForm hook 
  const { register, formState: { errors, isSubmitSuccessful }, reset, handleSubmit, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
    mode: "onChange",
  })


  const signupNewUser = async () => {
    const userBasicInfo = {
      last_name: getValues('firstName'),
      first_name: getValues('lastName'),
      email: getValues('email'),
      contact_number: getValues('number'),
      birthday: getValues('bday'),
    }

    const userCredential = {
      password: getValues('password'),
      email: userBasicInfo.email
    }

    try {
      
      const { error: signUpError, data } = await supabase.auth.signUp(userCredential)
      if(signUpError){
        throw new Error(`Signup Error: ${signUpError.message}`)
      }

      // feed basic info
      const { error: registrationError } = await supabase.from('renters').insert([{...userBasicInfo, credential_id: data.user.id}])
      if(registrationError){
        throw new Error(`Database Error: ${registrationError.message}`)
      }

      return { message: "Registration Successful" }

    } catch (error) {
      console.error(error)
      throw error
    }

  }

  // Register function for invoking submit button
  const handleRegister = async () => {
    const loading = toast.loading("Please wait...")

    try {
      await signupNewUser()

      toast.update(loading, {render: "Account created successfully", type:"success", isLoading:false, autoClose: autoClose})

      navigate("/")
      
    } catch (error) {
      console.error(error)
      toast.update(loading, {render: error.message, type:"error", isLoading:false, autoClose: autoClose})

    }



  }

  // Reset form state as per documentation use useEffect
  useEffect(()=> {
    if(isSubmitSuccessful){
      reset(defaultValues)
    }
  }, [isSubmitSuccessful, errors, reset])


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

export default Register;
