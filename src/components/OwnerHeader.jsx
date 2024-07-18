import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { MdAddCircleOutline, MdAccountCircle } from "react-icons/md";

function OwnerHeader() {
  return (
    <nav className="bg-primary text-white flex justify-between px-[3%] py-5 items-center top-0 z-10 sticky">
      {/* Left Side: Logo and Website Name */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Right Side: Account Button and Post a Rental Button */}
      <div className="flex items-center gap-10">
        {/* Post a Rental Button */}
        <Link to="/business-side/post-rental">
          <button className="bg-secondary text-text-color py-2 px-4 rounded-lg flex items-center gap-2">
            <MdAddCircleOutline className="text-xl" />
            <span> Post a Dormitory</span>
          </button>
        </Link>

        {/* Account Button */}
        {/* <button className="bg-secondary py-2 px-4 text-text-color font-semibold rounded flex items-center gap-2">
          <span>Account</span>
          <MdAccountCircle className="text-xl" />
        </button> */}
      </div>
    </nav>
  );
}

export default OwnerHeader;
