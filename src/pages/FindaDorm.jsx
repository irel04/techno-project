import Dorm from "../components/Dorm";
import img from "../assets/owner.png";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Select from "../components/Select";

const dorms = [
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
  },
];

const options = [
  "Php 1000 - 1500",
  "Php 1000 - 1500",
  "Php 1000 - 1500",
  "Php 1000 - 1500",
];

function FindaDorm() {
  return (
    <main className="w-full flex flex-col gap-10 items-center justify-center my-[3rem] md:my-[5rem]  ">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2">
        <SearchBar />

        <div className="flex items-center">
          <Select options={options} />
          <Filter />
        </div>
      </div>
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
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default FindaDorm;
