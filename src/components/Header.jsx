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
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const navigate = useNavigate();
  const loginPopupRef = useRef(null);
  const accountPopupRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { isAuthenticated, logout } = useAuth();

  const handleLoginButtonClick = () => {
    if (isAuthenticated) {
      setShowAccountPopup(!showAccountPopup);
    } else {
      setShowLoginPopup(true);
    }
  };

  const handleCloseLoginPopup = (success) => {
    setShowLoginPopup(false);
    setShowAccountPopup(false)
    if (success) {
      navigate("/profile");
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
    // console.log("Navigating to profile");

    setShowAccountPopup(false);
  };

  const handleLogoutClick = async () => {
    try {
      const { error: logoutError } = await logout()

      if (logoutError) {
        throw logoutError
      }

      navigate("/"); // Redirect to home or login page after logout
      setShowAccountPopup(false);

    } catch (error) {
      console.error(error)

    }

  };
  

  const handleClickOutside = (event) => {
    if (
      (loginPopupRef.current &&
        !loginPopupRef.current.contains(event.target)) ||
      (accountPopupRef.current &&
        !accountPopupRef.current.contains(event.target))
    ) {
      setShowLoginPopup(false);
      setShowAccountPopup(false);
    }
  };

  useEffect(() => {
    if (showLoginPopup || showAccountPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginPopup, showAccountPopup]);

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
                  to={`/scheduled-visits`}
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

      <div className="flex gap-10">
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


        </ul>
        <div className="block relative">
          <button
            onClick={handleLoginButtonClick}
            className="bg-secondary py-1 px-5 text-text-color font-semibold rounded flex items-center gap-2"
          >
            Account
            <MdAccountCircle className="text-primary text-xl" />
          </button>

          {isAuthenticated && showAccountPopup && (
            <div
              ref={accountPopupRef}
              className="absolute w-full text-center right-0 mt-2 bg-white text-black rounded shadow-lg"
            >
              <ul className="py-2">
                <li
                  onClick={handleProfileClick}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  Profile
                </li>
                <li
                  onClick={handleLogoutClick}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
    </nav>
  );
}

export default Header;
