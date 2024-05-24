import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink
      to="/"
      className="flex gap-3 items-center"
    >
      <img
        className="h-10 md:h-12"
        src={logo}
      />
      <h1 className="hidden lg:block text-xl font-bold">DormFinder.PH</h1>
    </NavLink>
  );
}

export default Logo;
