import React from "react";
import Logo from "./Logo";
import Link from "./Link";
import LoginButton from "./LoginButton";

function Header() {
  return (
    <nav className="bg-primary text-white flex justify-between px-[3%] py-5 items-center top-0 z-10 sticky">
      <Logo />

      <ul className="flex gap-10 items-center">
        <li>
          <Link
            to="/dorms"
            page="Find a Dorm"
          />
        </li>

        <li>
          <Link
            to="/about"
            page="About Us"
          />
        </li>

        <li>
          <Link
            to="/business"
            page="Post My Dorm"
          />
        </li>

        <li>
          <Link
            to="/faqs"
            page="Help"
          />
        </li>

        <li>
          <LoginButton />
        </li>
      </ul>
    </nav>
  );
}

export default Header;
