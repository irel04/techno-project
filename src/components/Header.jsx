import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Link from "./Link";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import LoginPopup from "./LoginPopup";
import { MdAccountCircle } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../utils/supabase";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();
  const loginPopupRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { isAuthenticated } = useAuth()

  

  const handleLoginButtonClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      setShowLoginPopup(true);
      // navigate("/login")
    }
  };

  const handleCloseLoginPopup = (success) => {
    setShowLoginPopup(false);
    if (success) {
      navigate("/profile");
    }
  };

  const handleClickOutside = (event) => {
    if (
      loginPopupRef.current &&
      !loginPopupRef.current.contains(event.target)
    ) {
      setShowLoginPopup(false);
    }
  };

  useEffect(() => {
    if (showLoginPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginPopup]);

  return (
    <nav className="bg-primary text-white flex justify-between px-[3%] py-5 items-center top-0 z-10 sticky">
      {showLoginPopup && (
        <div ref={loginPopupRef}>
          <LoginPopup onClose={handleCloseLoginPopup} />
        </div>
      )}

      <div className="flex gap-4 items-center">
        <button
          className="block md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <RxCross1 className="text-3xl font-bold" />
          ) : (
            <RxHamburgerMenu className="text-3xl font-bold" />
          )}
        </button>
        <Logo />
      </div>

      {isMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-primary flex flex-col items-center md:hidden text-text-color">
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/dorms"
                  page="Find a Dorm"
                />
              </li>
              <li>
                <Link
                  to="/favorites"
                  page="Favorites"
                />
              </li>
              <li>
                <Link
                  to="/scheduled-visits"
                  page="Scheduled Visits"
                />
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      )}

      <ul className="hidden md:flex gap-10 items-center">
        {isAuthenticated ? (
          <>
            <li>
              <Link
                to="/dorms"
                page="Find a Dorm"
              />
            </li>
            <li>
              <Link
                to="/favorites"
                page="Favorites"
              />
            </li>
            <li>
              <Link
                to="/scheduled-visits"
                page="Scheduled Visits"
              />
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
        <li>
          <button
            onClick={handleLoginButtonClick}
            className="bg-secondary py-1 px-5 text-text-color font-semibold rounded flex items-center gap-2"
          >
            Account
            <MdAccountCircle className="text-primary text-xl" />
          </button>
        </li>
      </ul>

      <li className="block md:hidden">
        <button
          onClick={handleLoginButtonClick}
          className="bg-secondary py-1 px-5 text-text-color font-semibold rounded flex items-center gap-2"
        >
          Account
          <MdAccountCircle className="text-primary text-xl" />
        </button>
      </li>
    </nav>
  );
}

export default Header;
