import dormOwnerPicture from "../assets/default.jpg";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import Dorm from "../components/Dorm";
import img from "../assets/owner.png";

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

function SpecificOwnerPage() {
  return (
    <main className="flex flex-col gap-5 my-[3rem] mx-[5%]">
      <section className="flex flex-col md:flex-row gap-2 md:gap-10 items-center">
        <img
          src={dormOwnerPicture}
          className="w-[10rem] h-[10rem] object-cover"
        />
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h1 className="text-3xl font-bold">Dorm Owner Name</h1>
          <p className="flex gap-1 items-center">
            <MdOutlineMail />
            dormowner@email.com
          </p>
          <p className="flex gap-1 items-center">
            <MdOutlinePhoneInTalk />
            099999999
          </p>
        </div>
      </section>

      <section className="grid  grid-cols-1 lg:grid-cols-3 justify-between gap-4">
        <div className="w-full bg-blue-50   rounded border- p-4 text-center flex flex-col gap-2">
          <p className="text-primary font-bold text-sm uppercase">
            Verified Listings
          </p>
          <span className="text-2xl font-extrabold">0 / 1</span>
        </div>

        <div className="w-full bg-blue-50   rounded border- p-4 text-center flex flex-col gap-2">
          <p className="text-primary font-bold text-sm uppercase">
            User Favorites
          </p>
          <span className="text-2xl font-extrabold">9 Favorites</span>
        </div>

        <div className="w-full bg-blue-50   rounded border- p-4 text-center flex flex-col gap-2">
          <p className="text-primary font-bold text-sm uppercase">
            Joined Date
          </p>
          <span className="text-2xl font-extrabold">May 2024</span>
        </div>
      </section>

      {/* List of Dorm Listings */}

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
    </main>
  );
}

export default SpecificOwnerPage;
