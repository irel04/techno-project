import Dorm from "../components/Dorm";
import img from "../assets/owner.png";
import NoData from "../components/NoData";
import HomeTitle from "../components/HomeTitle";

const dorms = [
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
    status: "verified",
    link: "/dorm/id",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
    status: "new",
    link: "/dorm/id",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
    status: "verified",
    link: "/dorm/id",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
    status: "verified",
    link: "/dorm/id",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
    status: "verified",
    link: "/dorm/id",
  },
];

function Favorites() {
  return (
    <main className="w-full flex flex-col gap-10 items-center justify-center my-[3rem] md:my-[5rem]">
      <HomeTitle title="Favorites" />
      {dorms.length === 0 ? (
        <NoData
          img={img}
          title="No favorite dorm found"
        />
      ) : (
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dorms.map((dorm, index) => (
            <li key={index}>
              <Dorm
                img={dorm.img}
                dormName={dorm.dormName}
                location={dorm.location}
                ownerName={dorm.ownerName}
                price={dorm.price}
                rating={dorm.rating}
                status={dorm.status}
                link={dorm.link}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Favorites;
