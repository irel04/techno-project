import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoMdPhotos } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import SlideshowModal from "../components/SlideshowModal";
import Button from "../components/Button";
import { useState } from "react";
import GoogleMap from "../components/GoogleMap";
import dormOwnerPicture from "../assets/default.jpg";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";

const photos = [
  "https://via.placeholder.com/300",
  "https://via.placeholder.com/301",
  "https://via.placeholder.com/302",
  "https://via.placeholder.com/303",
  "https://via.placeholder.com/304",
];

function SpecificDormPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isInquirePopupOpen, setIsInquirePopupOpen] = useState(false);
  const [isVisitPopupOpen, setIsVisitPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // const openInquirePopup = () => {
  //   setIsInquirePopupOpen(true);
  // };

  // const closeInquirePopup = () => {
  //   setIsInquirePopupOpen(false);
  // };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToOwnerPage = () => {
    navigate("/owner/id");
  };

  const openVisitPopup = () => {
    setIsVisitPopupOpen(true);
  };

  const closeVisitPopup = () => {
    setIsVisitPopupOpen(false);
  };

  return (
    <main className="mt-[1rem] mb-[3rem] flex flex-col gap-5">
      {/* Directory */}
      <div className="flex gap-4 items-center">
        <IoArrowBack />
        <a href="/dorms">Dorm Listings</a>
        <IoIosArrowForward />
        <p className="font-semibold">Dorm Details</p>
      </div>

      {/* Gallery */}
      <div className="relative">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-2 md:h-[300px] lg:h-[500px] overflow-hidden">
            <img
              src={photos[0]}
              alt="Gallery 0"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden col-span-1  md:h-[300px] lg:h-[500px] md:flex flex-col gap-4">
            <div className="h-1/2 overflow-hidden">
              <img
                src={photos[1]}
                alt="Gallery 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-1/2 overflow-hidden">
              <img
                src={photos[2]}
                alt="Gallery 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <FavoriteButton />
          <Button
            onClick={() => setIsModalOpen(true)}
            color="primary"
            className=" max-w-fit px-4 text-sm"
          >
            <IoMdPhotos className="text-white" />
            See All Photos
          </Button>
        </div>

        {isModalOpen && (
          <SlideshowModal
            photos={photos}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>

      {/* Information */}
      <section className="flex items-center md:items-start justify-between">
        <div>
          <p className="flex items-center gap-2">
            <GrLocation />
            Location
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4">
            <h1 className="font-bold text-2xl">Name of Dorm</h1>
            {/* Status (Newly Listed or Verified*/}
            {/* Newly Listed meaning di pa naveverify ng admin */}
            <p className="flex gap-2 items-center bg-secondary px-4 py-2 rounded max-w-fit font-semibold text-sm">
              <FaFire />
              Newly Listed
            </p>
            {/* Newly Listed meaning di pa naveverify ng admin */}
            <p className="flex gap-2 items-center bg-primary text-white px-4 py-2 rounded max-w-fit font-semibold text-sm">
              <FaFire />
              Verified
            </p>
          </div>
        </div>
        <div className="">
          <p className="">Rent Starts At</p>
          <p className="">
            PHP{" "}
            <span className="text-3xl text-primary font-extrabold">Price</span>
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row gap-2 justify-between items-start md:items-center">
        <div className="">
          <p className="text-lg font-semibold">Description</p>
          <p>Description of the Dorm</p>
        </div>
        <div className="flex gap-4">
          {/* <Button
            color="secondary"
            onClick={openInquirePopup}
          >
            Inquire Now
          </Button> */}
          <Button
            color="primary"
            onClick={openVisitPopup}
          >
            Schedule Visit
          </Button>
        </div>

        {isVisitPopupOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex flex-col gap-2 bg-white p-8 rounded w-full m-4 md:w-[30rem] max-w-[30rem]">
              {isLoggedIn ? (
                <>
                  <h2 className="text-2xl font-bold text-center ">
                    Schedule Visit
                  </h2>
                  <Input
                    type="date"
                    label="Select Date"
                    placeholder="Select Date"
                    required
                  />
                  <Input
                    type="time"
                    label="Select Time"
                    placeholder="Select Time"
                    required
                  />
                  <div className="mt-2 flex gap-2">
                    <Button
                      color="primary"
                      onClick={closeVisitPopup}
                    >
                      Book Now
                    </Button>
                    <Button
                      color="white"
                      onClick={closeVisitPopup}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-semibold mb-4">
                    You need to log in first before booking a schedule.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      color="primary"
                      onClick={navigateToLogin}
                    >
                      Login
                    </Button>
                    <Button
                      color="white"
                      onClick={closeVisitPopup}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <section className="flex flex-col lg:flex-row justify-between items-start">
        <div className="w-full flex flex-col gap-4">
          {/* Features */}

          <div className="flex flex-col gap-1">
            <div className="text-lg font-semibold">Features</div>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-hidden">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
              <li>Feature 5</li>
              <li>Feature 6</li>
              <li>Feature 7</li>
              <li>Feature 8</li>
              <li>Feature 9</li>
              <li>Feature 10</li>
              <li>Feature 11</li>
              <li>Feature 12</li>
            </ul>
          </div>
          {/* Amenities */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-lg font-semibold">Amenities</p>
            <ul className="grid grid-cols-2  md:grid-cols-3 gap-2 max-h-48 overflow-hidden">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
              <li>Feature 5</li>
              <li>Feature 6</li>
              <li>Feature 7</li>
              <li>Feature 8</li>
              <li>Feature 9</li>
              <li>Feature 10</li>
              <li>Feature 11</li>
              <li>Feature 12</li>
            </ul>
          </div>

          {/* Payment terms */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-lg font-semibold">Payment Terms</p>
            <ul className="flex flex-col gap-1">
              <li className="flex gap-1 items-center">
                Advance Payments:
                <p className="font-semibold">Payment</p>
              </li>
              <li className="flex gap-1 items-center">
                Security Deposit:
                <p className="font-semibold">Deposit</p>
              </li>
              <li className="flex gap-1 items-center">
                Minimum Stay:
                <p className="font-semibold">Deposit</p>
              </li>
              <li className="flex gap-1 items-center">
                Electricity Bills:
                <p className="font-semibold">Deposit</p>
              </li>
              <li className="flex gap-1 items-center">
                Water Bills:
                <p className="font-semibold">Deposit</p>
              </li>
              <li className="flex gap-1 items-center">
                Association Dues:
                <p className="font-semibold">Deposit</p>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">Near Landmarks</p>
            <ul className="flex flex-col gap-1">
              <li>Near Landmark 1</li>
              <li>Near Landmark 2</li>
              <li>Near Landmark 3</li>
            </ul>
          </div>
        </div>

        {/* Map */}
        <div className="mt-4 w-full">
          <GoogleMap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123552.89649011318!2d120.99793040419922!3d14.597479520235341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b795a0e244e5%3A0x6a1a7885c2c5109!2sArt%20In%20Island!5e0!3m2!1sen!2sph!4v1717234973176!5m2!1sen!2sph" />
        </div>
      </section>

      <section className="flex justify-between items-start"></section>

      {/* Owner */}
      <div className="flex gap-4 items-center">
        {/* Picture of Dorm Owner */}
        <img
          src={dormOwnerPicture}
          className="h-24 w-24"
          alt="Dorm Owner"
        />
        <div className="flex flex-col gap-1">
          This dorm listing is managed by
          <p className="font-bold text-2xl">Dorm Owner Name</p>
          <Button
            color="primary"
            className="max-w-fit text-sm"
            onClick={navigateToOwnerPage}
          >
            View host's profile <IoIosArrowRoundForward />
          </Button>
        </div>
      </div>
    </main>
  );
}

export default SpecificDormPage;
