import { GrLocation } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import HeartButton from "./FavoriteButton";

function Dorm({ img, dormName, location, ownerName, price, rating, link }) {
  return (
    <a
      className="bg-white shadow-custom w-full lg:max-w-[25rem] h-[18rem] max-h-[25rem] rounded flex flex-col gap-2 cursor-pointer"
      href={link}
    >
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
              PHP{" "}
              <span className="text-2xl text-primary font-extrabold">
                {price}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="flex items-center text-sm gap-1">
            <FaStar className="text-secondary" />
            {rating} / 5 Star Rating
          </p>

          <HeartButton />
        </div>
      </div>
    </a>
  );
}

export default Dorm;
