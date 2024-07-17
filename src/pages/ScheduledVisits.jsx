import Dorm from "../components/Dorm";
import img from "../assets/owner.png";
import NoData from "../components/NoData";
import HomeTitle from "../components/HomeTitle";
import Visit from "../components/Visit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { spStorageKey } from "../utils/constant";
import DormListSkeleton from "../components/skeletons/DormListSkeleton";

const visits = [
  {
    img: img,
    dormName: "Dorm Name",
    status: "Status",
    date: "Date",
    location: "Location",
  },
  {
    img: img,
    dormName: "Dorm Name",
    status: "Status",
    date: "Date",
    location: "Location",
  },
  {
    img: img,
    dormName: "Dorm Name",
    status: "Status",
    date: "Date",
    location: "Location",
  },
  {
    img: img,
    dormName: "Dorm Name",
    status: "Status",
    date: "Date",
    location: "Location",
  },
];

function ScheduledVisits() {

  const [scheduledProperties, setScheduledProperties] = useState([])

  const [storedValue] = useLocalStorage(spStorageKey, null)
  const [isLoading, setIsLoading] = useState(true)
  const { id: userId } = storedValue.user

 


  // fetch data 
  useEffect(() => {
    const fetchSchedules = async () => {
      try {

        const { data: renter, error: userError } = await supabase.from("renters").select("id").eq("user_id", userId)

        const { data: schedules, error: scheduleError } = await supabase.from('renter_schedule')
          .select(`date, renter_id, isCompleted, time, id, properties(*,  location: addresses_property(
            province,
            city,
            barangay,
            street,
            longitude,
            latitude
          ))`)
          .eq('renter_id', renter[0].id).eq("is_active", true)

        if (scheduleError) {
          throw scheduleError
        }

        setScheduledProperties(schedules)


      } catch (error) {
        console.error(error)
      }
      setIsLoading(false)
    }

    fetchSchedules()

  }, [isLoading])



  return (
    <main className="flex flex-col gap-10 items-center justify-center my-[3rem] md:my-[5rem]">
      <HomeTitle title="Scheduled Visits" />


      {isLoading ? <div className="w-max grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => <DormListSkeleton key={index} />)}
      </div> : <>
        {scheduledProperties.length === 0 ? (
          <NoData
            img={img}
            title="No scheduled visits found"
          />
        ) : (
          <ul className="w-max grid grid-cols-1 lg:grid-cols-2 gap-4">
            {scheduledProperties.map((scheds, index) => (
              <li key={index}>
                <Visit
                  img={visits[0].img}
                  dormName={scheds.properties.dorm_name}
                  status={scheds.isCompleted ? "COMPLETED" : "TO VISIT"}
                  date={scheds.date}
                  location={`${scheds.properties.location.city}, ${scheds.properties.location.province}`}
                  link={scheds.link}
                  setIsLoading={setIsLoading}
                  scheduleId={scheds.id}
                />
              </li>
            ))}
          </ul>
        )}
      </>}

    </main>
  );
}

export default ScheduledVisits;
