import Dorm from "../components/Dorm";
import img from "../assets/owner.png";
import NoData from "../components/NoData";
import HomeTitle from "../components/HomeTitle";
import Visit from "../components/Visit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

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

  const { renterId } = useParams()
  const [scheduledProperties, setScheduledProperties] = useState([])

  // fetch data 
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        
        const { data: schedules, error: scheduleError } = await supabase.from('renter_schedule')
        .select(`date, renter_id, isCompleted, time, id, properties(*,  location: addresses_property(
            province,
            city,
            barangay,
            street,
            longitude,
            latitude
          ))`)
        .eq('renter_id', renterId)

        if(scheduleError){
          throw scheduleError
        }

        setScheduledProperties(schedules)


      } catch (error) {
        console.error(error)
      }
    }

    fetchSchedules()

  }, [])



  return (
    <main className="flex flex-col gap-10 items-center justify-center my-[3rem] md:my-[5rem]">
      <HomeTitle title="Scheduled Visits" />
      {scheduledProperties.length === 0 ? (
        <NoData
          img={img}
          title="No scheduled visits found"
        />
      ) : (
        <ul className="w-full grid grid-cols-1 lg:grid-cols-2  gap-4">
          {scheduledProperties.map((scheds, index) => (
            <li key={index}>
              <Visit
                img={visits[0].img}
                dormName={scheds.properties.dorm_name}
                status={scheds.isCompleted ? "COMPLETED" : "TO VISIT"}
                date={scheds.date}
                location={`${scheds.properties.location.city}, ${scheds.properties.location.province}`}
                link={scheds.link}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default ScheduledVisits;
