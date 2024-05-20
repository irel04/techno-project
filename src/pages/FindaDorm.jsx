import React from "react";
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

function FindaDorm() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
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
  );
}

export default FindaDorm;
