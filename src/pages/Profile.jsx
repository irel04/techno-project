import Button from "../components/Button";
import Input from "../components/Input";
import logo from "../assets/default.jpg";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { spStorageKey } from "../utils/constant";
import CustomInputSkeleton from "../components/skeletons/CustomInputSkeleton";

const schema = yup.object({
  firstName: yup.string().required().max(50).label("First Name"),
  lastName: yup.string().required().max(50).label("Last Name"),
  bday: yup.string().required().label("Birthday"),
  number: yup.string().max(12).label("Contact Number")
})

const passwordSchema = yup.object({
  email: yup.string().max(50).required().label("Email"),
  password: yup.string().required().label("Password").max(50),
  newPassword: yup.string().required().label("New Password").max(51),
  confirmPassword: yup.string().required().label("Confirm Password").max(51),
})

function Profile() {

  // Initialized useForm hook
  const { register, formState: { errors }, reset, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  })

  const handleUpdateProfile = async () => {
    console.log("Hi Raven")
  }

  // User id
  const [user] = useLocalStorage(spStorageKey, null)

  // states
  const [isLoading, setIsLoading] = useState(false)

  // Call details
  useEffect(() => {
    const fetchUserData = async() => {
      setIsLoading(true)
      const {id: credential_id} = user.user

      try {
        const {data: renters, error} = await supabase.from("renters").select("*").eq("credential_id", credential_id) .eq('is_active', true)
        
        if(error){
          throw error
        }

        const {first_name, last_name, email, contact_number, birthday} = renters[0]

        setValue("firstName", first_name)
        setValue("lastName", last_name)
        setValue("bday", birthday)
        setValue("number", contact_number),
        setValue("email", email)
        setIsLoading(false)

      } catch (error) {
        console.error(error)
      }

    }

    fetchUserData()
  }, [])


  return (
    <main className="flex flex-col lg:gap-[10rem] items-center justify-center my-[3rem] md:my-[5rem] lg:mx-[5%]">
      <section className="w-full gap-5 lg:gap-10 flex flex-col md:flex-row">
        <div className="flex flex-col gap-5 items-center ">
          <img
            src={logo}
            className="rounded-3xl w-[10rem] h-[10rem] object-cover"
          />
          <Button
            color="primary"
            className="max-w-fit px-10"
          >
            Upload image
          </Button>
        </div>

        <div className="w-full">
          <form onSubmit={handleSubmit(handleUpdateProfile)} className="rounded pt-0 p-5 flex flex-col gap-3">
            <h1 className="font-bold text-xl">Personal Information</h1>
            {!isLoading ? (
              <>
                <Input
                  label="First Name"
                  placeholder=""
                  register={register}
                  name={"firstName"}
                  error={errors.firstName}
                  maxLength={51}
                />

                <Input
                  label="Last Name"
                  register={register}
                  name={"lastName"}
                  maxLength={51}
                  error={errors.lastName}
                />

                <Input
                  label="Email"
                  type="email"
                  register={register}
                  maxLength={51}
                  name={"email"}
                  error={errors.email}
                />

                <Input
                  label="Birthday"
                  type="date"
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

                <Button
                  className="w-fit px-5 ml-auto"
                  color="primary"
                >
                  Save
                </Button>
              </>
            ) : Array.from({length: 5}).map((_, index) => (
              <CustomInputSkeleton/>
            ))}
          </form>
          <ChangePassword/>
        </div>
      </section>
    </main>
  );
}

const ChangePassword = () => {

  // Initialized useForm hook
  const { register, formState: { errors }, reset, handleSubmit, set} = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onChange"
  })

  const handleChangePassword = async () => {
    console.log("Password changed")
  }

  useEffect(()=>{
    
  }, [])

  return (
    <form onSubmit={handleSubmit(handleChangePassword)} className="rounded pt-0 p-5 flex flex-col gap-3">
      <h1 className="font-bold text-xl">Security Information</h1>

      <Input label="Current Password" error={errors.password} maxLength={51} register={register} name={"password"} />
      <Input label="New Password" error={errors.newPassword} maxLength={51} register={register} name={"newPassword"} />
      <Input label="Confirm New Password" error={errors.confirmPassword} maxLength={51} register={register} name={"confirmPassword"} />

      <Button className="w-fit px-5 ml-auto" color="primary">
        Save
      </Button>
    </form>
  )
}

export default Profile;
