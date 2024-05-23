import Dorm from "../components/Dorm";
import img from "../assets/owner.png";
import NoData from "../components/NoData";
import HomeTitle from "../components/HomeTitle";
import Visit from "../components/Visit";

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
  return (
    <main className="flex flex-col gap-10 items-center justify-center my-[3rem] md:my-[5rem]">
      <HomeTitle title="Scheduled Visits" />
      {visits.length === 0 ? (
        <NoData
          img={img}
          title="No scheduled visits found"
        />
      ) : (
        <ul className="w-full grid grid-cols-1 lg:grid-cols-2  gap-4">
          {visits.map((visits, index) => (
            <li key={index}>
              <Visit
                img={visits.img}
                dormName={visits.dormName}
                status={visits.status}
                date={visits.date}
                location={visits.location}
                link={visits.link}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default ScheduledVisits;
