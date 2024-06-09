import { GrLocation } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import FavoriteButton from "./FavoriteButton";
import { FaCircleCheck } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ASSETS_DORMS } from "../utils/constant";
import defaultImg from "../assets/owner.png";


function Dorm({ img, dormName, location, ownerName, price, isVerfied, link, status="new" }) {
  


  const navigate = useNavigate()

  const handleClickDorm = () => {
    navigate(link)
  }

  return (
    <div className="bg-white shadow-custom w-full lg:max-w-[25rem] h-[18rem] max-h-[25rem] rounded flex flex-col gap-2">
      <img
        src={img ? ASSETS_DORMS + img : defaultImg}
        className="h-[10rem] w-full object-cover cursor-pointer"
        onClick={handleClickDorm}
      />

      <div className="flex flex-col gap-2 p-3">
        <div className="flex justify-between cursor-pointer" onClick={handleClickDorm}>
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
          {status === "new" && (
            <p className="flex gap-2 items-center bg-secondary px-2 py-1 rounded max-w-fit font-semibold text-sm">
              <FaFire />
              Newly Listed
            </p>
          )}
          {isVerfied && (
            <p className="flex gap-2 items-center bg-primary text-white px-2 py-1 rounded max-w-fit font-semibold text-sm">
              <FaCircleCheck />
              Verified
            </p>
          )}
          <FavoriteButton />
        </div>
      </div>
    </div>
  );
}

export default Dorm;
