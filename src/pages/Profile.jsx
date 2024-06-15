import Button from "../components/Button";
import Input from "../components/Input";
import logo from "../assets/default.jpg";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PROFILE_PHOTO, autoClose, spStorageKey } from "../utils/constant";
import CustomInputSkeleton from "../components/skeletons/CustomInputSkeleton";
import { toast } from "react-toastify";
import { customToastParameter } from "../utils/helper";

const schema = yup.object({
  first_name: yup.string().required().max(50).label("First Name"),
  last_name: yup.string().required().max(50).label("Last Name"),
  birthday: yup.string().required().label("Birthday"),
  contact_number: yup.string().max(12).label("Contact Number"),
  profile_photo: yup.string().label("Profile photo")
})

const passwordSchema = yup.object({
  password: yup.string().required("New password is required").min(10, "Minimum 10 charcters").max(30, "Maximum character exceeded"),
  confirmPassword: yup.string().required("Please confirm your password").min(10, "Minimum 10 charcters").max(30, "Maximum character exceeded").oneOf([yup.ref('password'), null], 'Passwords must match'),
})

function Profile() {

  // User id
  const [user] = useLocalStorage(spStorageKey, null)
  const { id: credential_id } = user.user


  // states
  const [isLoading, setIsLoading] = useState(false)

  

  const fetchUserData = async() => {
    setIsLoading(true)
    

    try {
      const {data: renters, error} = await supabase.from("renters").select("*").eq("credential_id", credential_id).eq('is_active', true)
      
      if(error){
        throw error
      }

      const data = renters[0]
      setIsLoading(false)

      return data

    } catch (error) {
      console.error(error)
    }

  }

  // Initialized useForm hook
  const { register, formState: { errors, isDirty}, reset, handleSubmit, getValues } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: async () => await fetchUserData()
  })

  

  // Profile photo
  const displayPhoto = getValues("profile_photo")

  
  // Submit event
  const handleUpdateProfile = async (data) => {
    const loading = toast.loading("Updating...")
    try {
      const currentDate = new Date().toISOString()
      
      const { error } = await supabase.from("renters").update({...data, updated_at: currentDate}).eq("credential_id", credential_id).eq('is_active', true)
      
      if(error){
        throw error
      }
      reset(data)
      toast.update(loading, customToastParameter("Profile updated successfully", "success"))
    } catch (error) {
      console.error(error)
      toast.update(loading, customToastParameter(error.message, "error"))
    }
  }

  const handleUpdatePhoto = async (e) => {
    const file = e.target.files[0]
    const { id: credential_id } = user.user

    const loading = toast.loading("Updating photo...")
    
    try {
      
      const { error: fileUploadError } = await supabase.storage.from("assets").upload(`renters/${file.name}`, file, {contentType: "image/*", upsert: true})

      if(fileUploadError){
        throw fileUploadError
      }

      const { error: fileNameError } = await supabase.from("renters").update({ "profile_photo": file.name }).eq("credential_id", credential_id).eq("is_active", true)

      if(fileNameError){
        throw fileNameError
      }

      toast.update(loading, customToastParameter("Upload Successfully", "success"))

    } catch (error) {
      console.error(error)
      toast.update(loading, customToastParameter(error.message, "error"))
    }

  }  
  


  return (
    <main className="flex flex-col lg:gap-[10rem] items-center justify-center my-[3rem] md:my-[5rem] lg:mx-[5%]">
      <section className="w-full gap-5 lg:gap-10 flex flex-col md:flex-row">
        <div className="flex flex-col gap-5 items-center ">
          <img
            src={displayPhoto? PROFILE_PHOTO + displayPhoto : logo}
            className="rounded-3xl w-[8rem] h-[8rem] object-cover"
          />
          <label
            color="primary"
            className="whitespace-nowrap px-4 flex gap-2 items-center py-2 rounded relative text-center justify-center text-md font-bold w-full bg-primary text-white cursor-pointer"
            htmlFor="profileImg"
          >
            Upload image
          </label>
          <input id="profileImg" type="file" accept="image/*" className="hidden" onChange={handleUpdatePhoto}/>
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
                  name={"first_name"}
                  error={errors.first_name}
                  maxLength={51}
                />

                <Input
                  label="Last Name"
                  register={register}
                  name={"last_name"}
                  maxLength={51}
                  error={errors.last_name}
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
                  name={"birthday"}
                  error={errors.birthday}
                />

                <Input
                  label="Contact Number"
                  type="contact_number"
                  register={register}
                  maxLength={12}
                  name={"contact_number"}
                />

                <Button
                  className="w-fit px-5 ml-auto"
                  color={isDirty ? "primary" : "greyscale"}
                  disabled={!isDirty}

                >
                  Save
                </Button>
              </>
            ) : Array.from({length: 5}).map((_, index) => (
              <CustomInputSkeleton key={index}/>
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
  const { register, formState: { errors, isDirty }, reset, handleSubmit, set} = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const handleChangePassword = async (data) => {
    const loading = toast.loading("Updating...")
    try {
      
      console.log(data)

      const { error } = await supabase.auth.updateUser({
        password: data.password
      })

      if(error){
        throw error
      }
      
      toast.update(loading, customToastParameter("Password updated", "success"))
      reset(data)

    } catch (error) {
      console.error(error)
      toast.update(loading, customToastParameter(error.message, "error"))
    }
  }

  useEffect(()=>{
    
  }, [])

  return (
    <form onSubmit={handleSubmit(handleChangePassword)} className="rounded pt-0 p-5 flex flex-col gap-3">
      <h1 className="font-bold text-xl">Security Information</h1>

      {/* <Input label="Current Password" error={errors.password} maxLength={51} register={register} name={"password"} /> */}
      <Input label="New Password" error={errors.password} maxLength={51} register={register} name={"password"} />
      <Input label="Confirm New Password" error={errors.confirmPassword} maxLength={51} register={register} name={"confirmPassword"} />

      <Button
        className="w-fit px-5 ml-auto"
        color={isDirty ? "primary" : "greyscale"}
        disabled={!isDirty}
      >
        Save
      </Button>
    </form>
  )
}

export default Profile;
