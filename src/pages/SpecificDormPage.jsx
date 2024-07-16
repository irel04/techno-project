import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoMdPhotos } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import SlideshowModal from "../components/SlideshowModal";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import GoogleMap from "../components/GoogleMap";
import dormOwnerPicture from "../assets/default.jpg";
import Input from "../components/Input";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import { supabase } from "../utils/supabase";
import { ASSETS_DORMS, spStorageKey } from "../utils/constant";
import DormPageSkeleton from "../components/skeletons/DormPageSkeleton";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalStorage } from "../hooks/useLocalStorage"
import { toast } from "react-toastify";
import { customToastParameter, formatDateYYMMDD } from "../utils/helper";
import { useAuth } from "../hooks/useAuth";


// Nakabind to sa slideshow modal as default image
export const photos = [
  "https://via.placeholder.com/300",
  "https://via.placeholder.com/301",
  "https://via.placeholder.com/302",
  "https://via.placeholder.com/303",
  "https://via.placeholder.com/304",
];

const scheduleVisitSchema = yup.object({
  time: yup.string().required("Pick your preferred time"),
  date: yup.string().required("Pick your preferred date"),

})

function SpecificDormPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isInquirePopupOpen, setIsInquirePopupOpen] = useState(false);
  const [isVisitPopupOpen, setIsVisitPopupOpen] = useState(false);
  const { isAuthenticated } = useAuth()

  // Initialized form 
  const { register, formState: { errors, isDirty }, reset, handleSubmit } = useForm({
    resolver: yupResolver(scheduleVisitSchema),
    mode: "onChange"
  })

  // dorm id
  const { dormId } = useParams()
  const [owner] = useSearchParams()
  const [credentials] = useLocalStorage(spStorageKey, null)
  const user = credentials?.user
  const [renterId, setRenterId] = useState(null)


  // const openInquirePopup = () => {
  //   setIsInquirePopupOpen(true);
  // };

  // const closeInquirePopup = () => {
  //   setIsInquirePopupOpen(false);
  // };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };


  const openVisitPopup = () => {
    setIsVisitPopupOpen(true);
  };

  const closeVisitPopup = () => {
    setIsVisitPopupOpen(false);
  };


  // call data 
  const [dormDetails, setDormDetails] = useState([])
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isScheduled, setIsScheduled] = useState(false)


  useEffect(() => {

    const fetchDormById = async () => {

      try {

        if (user) {

          const {data: renter, error: renterError} = await supabase.from("renters").select("id").eq("user_id", user.id)

          if(renterError){
            throw renterError
          }

          setRenterId(renter[0].id)

          const { data: renterSchedule, error: renterScheduleError } = await supabase.from("renter_schedule")
            .select("*").eq("property_id", dormId).eq("renter_id", renter[0].id);

          if (renterScheduleError) {
            throw renterScheduleError
          }

          setIsScheduled(renterSchedule.length? true : false)
          
        }


        const { data: dormsInfo, error: dormError } = await supabase.from("properties").select(`
          id,
          dorm_name,
          provider: lease_providers (
            id,
            last_name,
            first_name,
            isVerified
          ),
          rates: rent_rates(
            from
          ),
          description,
          images: properties_images(image_name),
          ratings,
          location: addresses_property(
            province,
            city,
            barangay,
            street,
            link
          )`).eq("id", dormId)

        if (dormError) {
          throw dormError
        }

        setImages(dormsInfo[0].images.map(img => img.image_name))

        setDormDetails(dormsInfo)
        setIsLoading(false)

      } catch (error) {
        console.error(error)
      }
    }

    fetchDormById()



  }, [dormId])


  const handleScheduleVisit = async (data) => {
    
    const loading = toast.loading("Booking a schedule")

    try {
      const { data: renter, error: renterError } = await supabase.from("renters").select("id").eq("user_id", user?.id)

      if(renterError){
        throw renterError
      }

      const { data: renterSchedule, error: renterScheduleError } = await supabase.from("renter_schedule").select("id").eq("property_id", dormId).eq("renter_id", renter[0].id)

      if(renterScheduleError || !!renterSchedule.length){
        throw renterScheduleError || new Error("You already booked a schedule")
      } 


      const { error: createScheduleError } = await supabase.from("renter_schedule").insert({...data, renter_id: renter[0].id, property_id: dormId})

      if(createScheduleError){
        throw createScheduleError
      }

      toast.update(loading, customToastParameter("Booked successfully", "success"))
      closeVisitPopup()
      setIsScheduled(true)
    } catch (error) {
      console.error(error)
      toast.update(loading, customToastParameter(error.message, "error"))
    }
  }

  const navigateToOwnerPage = () => {
    if (dormDetails.length > 0 && dormDetails[0].provider) {
      navigate(`/owner/${dormDetails[0].provider.id}`);
    }
  };


  return (
    <main className="mt-[1rem] mb-[3rem] flex flex-col gap-5">

      {isLoading ? <DormPageSkeleton /> :
        <>
          {/* Directory */}
          <div className="flex gap-4 items-center">
            <IoArrowBack />
            <a href="/dorms">Dorm Listings</a>
            <IoIosArrowForward />
            <p className="font-semibold">{dormDetails[0].dorm_name}</p>
          </div>

          {/* Gallery */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 md:col-span-2 md:h-[300px] lg:h-[500px] overflow-hidden">
                <img
                  src={images.length ? `${ASSETS_DORMS}${dormId}/${images[2]}` : photos[0]}
                  alt="Gallery 0"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden col-span-1  md:h-[300px] lg:h-[500px] md:flex flex-col gap-4">
                <div className="h-1/2 overflow-hidden">
                  <img
                    src={images.length ? `${ASSETS_DORMS}${dormId}/${images[1]}` : photos[1]}
                    alt="Gallery 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-1/2 overflow-hidden">
                  <img
                    src={images.length ? `${ASSETS_DORMS}${dormId}/${images[0]}` : photos[2]}
                    alt="Gallery 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <FavoriteButton />
              <Button
                onClick={() => setIsModalOpen(true)}
                color="primary"
                className=" max-w-fit px-4 text-sm"
              >
                <IoMdPhotos className="text-white" />
                See All Photos
              </Button>
            </div>

            {isModalOpen && (
              <SlideshowModal
                photos={images}
                onClose={() => setIsModalOpen(false)}
                dormId={dormId}
              />
            )}
          </div>

          {/* Information */}
          <section className="flex items-center md:items-start justify-between">
            <div>
              <p className="flex items-center gap-2 mb-2">
                <GrLocation />
                {`${dormDetails[0].location?.street} ${dormDetails[0].location?.barangay} ${dormDetails[0].location?.city} ${dormDetails[0].location?.province}`}
              </p>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4">
                <h1 className="font-bold text-2xl">{dormDetails[0].dorm_name}</h1>
                {/* Status (Newly Listed or Verified*/}
                {/* Newly Listed meaning di pa naveverify ng admin */}
                <p className="flex gap-2 items-center bg-secondary px-4 py-2 rounded max-w-fit font-semibold text-sm">
                  <FaFire />
                  Newly Listed
                </p>
                {/* Newly Listed meaning di pa naveverify ng admin */}
                {dormDetails[0].provider.isVerified ? <p className="flex gap-2 items-center bg-primary text-white px-4 py-2 rounded max-w-fit font-semibold text-sm">
                  <FaCircleCheck />
                  Verified
                </p> : null}
              </div>
            </div>
            <div className="">
              <p className="">Rent Starts At</p>
              <p className="">
                PHP{" "}
                <span className="text-3xl text-primary font-extrabold">{dormDetails[0].rates.from}</span>
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-2 justify-between items-start md:items-center">
            <div className="">
              <p className="text-lg font-semibold">Description</p>
              <p>{dormDetails[0].description}</p>
            </div>
            <div className="flex gap-4">
              {/* <Button
            color="secondary"
            onClick={openInquirePopup}
          >
            Inquire Now
          </Button> */}
              <Button
                color="primary"
                onClick={isScheduled? () => navigate(`/scheduled-visits`) : openVisitPopup}
              >
                {isScheduled? "View Schedules" : "Schedule Visit"}
              </Button>
            </div>

            {isVisitPopupOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-hidden">
                <div className="flex flex-col gap-2 bg-white p-8 rounded w-full m-4 md:w-[30rem] max-w-[30rem]">
                  {isAuthenticated ? (
                    <form onSubmit={handleSubmit(handleScheduleVisit)}>
                      <h2 className="text-2xl font-bold text-center ">
                        Schedule Visit
                      </h2>
                      <Input
                        type="date"
                        label="Select Date"
                        name={"date"}
                        register={register}
                        error={errors.date}
                        placeholder="Select Date"
                        maxDateTime={"2028-12-31"}
                        minDateTime={formatDateYYMMDD()}
                        required
                      />
                      <Input
                        type="time"
                        label="Select Time"
                        name={"time"}
                        register={register}
                        error={errors.time}
                        placeholder="Select Time"
                        required
                      />
                      <div className="mt-2 flex gap-2">
                        <Button
                          color="primary"
                        // onClick={closeVisitPopup}
                        >
                          Book Now
                        </Button>
                        <Button
                          color="white"
                          type="button"
                          onClick={closeVisitPopup}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-4">
                        You need to log in first before booking a schedule.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          color="primary"
                          onClick={navigateToLogin}
                        >
                          Login
                        </Button>
                        <Button
                          color="white"
                          onClick={closeVisitPopup}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          <section className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full flex flex-col gap-4">
              {/* Features */}

              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold">Features</div>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-hidden">
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                  <li>Feature 4</li>
                  <li>Feature 5</li>
                  <li>Feature 6</li>
                  <li>Feature 7</li>
                  <li>Feature 8</li>
                  <li>Feature 9</li>
                  <li>Feature 10</li>
                  <li>Feature 11</li>
                  <li>Feature 12</li>
                </ul>
              </div>
              {/* Amenities */}
              <div className="w-full flex flex-col gap-1">
                <p className="text-lg font-semibold">Amenities</p>
                <ul className="grid grid-cols-2  md:grid-cols-3 gap-2 max-h-48 overflow-hidden">
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                  <li>Feature 4</li>
                  <li>Feature 5</li>
                  <li>Feature 6</li>
                  <li>Feature 7</li>
                  <li>Feature 8</li>
                  <li>Feature 9</li>
                  <li>Feature 10</li>
                  <li>Feature 11</li>
                  <li>Feature 12</li>
                </ul>
              </div>

              {/* Payment terms */}
              <div className="w-full flex flex-col gap-1">
                <p className="text-lg font-semibold">Payment Terms</p>
                <ul className="flex flex-col gap-1">
                  <li className="flex gap-1 items-center">
                    Advance Payments:
                    <p className="font-semibold">Payment</p>
                  </li>
                  <li className="flex gap-1 items-center">
                    Security Deposit:
                    <p className="font-semibold">Deposit</p>
                  </li>
                  <li className="flex gap-1 items-center">
                    Minimum Stay:
                    <p className="font-semibold">Deposit</p>
                  </li>
                  <li className="flex gap-1 items-center">
                    Electricity Bills:
                    <p className="font-semibold">Deposit</p>
                  </li>
                  <li className="flex gap-1 items-center">
                    Water Bills:
                    <p className="font-semibold">Deposit</p>
                  </li>
                  <li className="flex gap-1 items-center">
                    Association Dues:
                    <p className="font-semibold">Deposit</p>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Near Landmarks</p>
                <ul className="flex flex-col gap-1">
                  <li>Near Landmark 1</li>
                  <li>Near Landmark 2</li>
                  <li>Near Landmark 3</li>
                </ul>
              </div>
            </div>

            {/* Map */}
            <div className="mt-4 w-full">
              <GoogleMap src={dormDetails[0].location.link ?? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123552.89649011318!2d120.99793040419922!3d14.597479520235341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b795a0e244e5%3A0x6a1a7885c2c5109!2sArt%20In%20Island!5e0!3m2!1sen!2sph!4v1717234973176!5m2!1sen!2sph"} />
            </div>
          </section>

          <section className="flex justify-between items-start"></section>

          {/* Owner */}
          <div className="flex gap-4 items-center">
            {/* Picture of Dorm Owner */}
            <img
              src={dormOwnerPicture}
              className="h-24 w-24"
              alt="Dorm Owner"
            />
            <div className="flex flex-col gap-1">
              This dorm listing is managed by
              <p className="font-bold text-2xl">{`${dormDetails[0].provider.first_name} ${dormDetails[0].provider.last_name}`}</p>
              <Button
                color="primary"
                className="max-w-fit text-sm"
                onClick={navigateToOwnerPage}
              >
                View host's profile <IoIosArrowRoundForward />
              </Button>
            </div>
          </div>
        </>
      }
    </main>
  );
}

export default SpecificDormPage;
