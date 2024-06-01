import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGooglePlus } from "react-icons/fa";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-white py-[5rem] px-[3%] gap-10">
      <div className="flex flex-col items-center justify-center text-center md:text-left md:items-start md:justify-start gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold">DormFinder.PH</h1>
          <ul className="flex gap-2 items-center justify-center md:justify-start">
            <Link to="">
              <FaFacebook className="text-secondary text-4xl" />
            </Link>
            <Link to="">
              <FaFacebookMessenger className="text-secondary text-4xl" />
            </Link>
            <Link to="">
              <FaTwitter className="text-secondary text-4xl" />
            </Link>
            <Link to="">
              <FaGooglePlus className="text-secondary text-4xl" />
            </Link>
          </ul>
        </div>

        <div className="font-semibold">
          <a
            href="#"
            className="flex gap-1 items-center "
          >
            <MdOutlinePhoneInTalk />
            (+63) 999 999 9999
          </a>

          <a
            href="mailto:hello@dormfinder.ph"
            className="flex gap-1 items-center"
          >
            <MdOutlineMail />
            hello@dormfinder.ph
          </a>
        </div>

        <div className="font-semibold">
          <p>DormFinder.PH &#169; {currentYear}.</p>
          <p>All rights reserved.</p>
          <p>Group Name Inc.</p>
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-3">
        <p className="text-xl font-bold">Renting</p>
        <a href="">Browse Dorms</a>
        <a href="">Post My Dorm (Business)</a>
      </div>

      <div className="hidden md:flex flex-col gap-3">
        <p className="text-xl font-bold">Popular Searches</p>
        <a href="">Browse Dorms</a>
        <a href="/owner/id">Post My Dorm (Business)</a>
      </div>

      <div className="hidden md:flex flex-col gap-3">
        <p className="text-xl font-bold">Quick Links</p>
        <a href="">Help Center</a>
        <a href="">About Us</a>
        <a href="">Account</a>

        <p className="text-xl font-bold">Legal</p>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </footer>
  );
}

export default Footer;
