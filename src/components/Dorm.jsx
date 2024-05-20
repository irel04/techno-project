import React from "react";
import { GrLocation } from "react-icons/gr";
import { FaStar } from "react-icons/fa";

function Dorm({ img, dormName, location, ownerName, price, rating }) {
  return (
    <div className="bg-white shadow-custom w-[20rem] h-[18rem] rounded flex flex-col gap-2">
      <img
        src={img}
        className="h-[10rem] w-full object-cover"
      />

      <div className="flex flex-col gap-2 p-3">
        <div className="flex justify-between">
          <div className="flex flex-col leading-none">
            <h1 className="text-xl font-bold">{dormName}</h1>
            <p className="flex items-center gap-1 text-sm">
              <GrLocation />
              {location}
            </p>
            <p className="text-primary font-semibold">{ownerName}</p>
          </div>

          <div className="">
            <p className="text-xs">Rent Starts At</p>
            <p className="text-xs">
              PHP <span className="text-2xl font-extrabold">{price}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="flex items-center text-sm gap-1">
            <FaStar className="text-secondary" />
            {rating} / 5 Star Rating
          </p>

          <button>Star button</button>
        </div>
      </div>
    </div>
  );
}

export default Dorm;
