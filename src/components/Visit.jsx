import React, { useState } from "react";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import Button from "./Button";

function Visit({ img, date, dormName, status, location, link }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancelSchedule = () => {
    // Perform cancellation logic here
    setShowConfirmation(false);
  };

  return (
    <div className="items-center bg-white shadow-custom w-full flex p-4 gap-4 lg:w-[28rem] xl:w-[40rem]">
      <img
        src={img}
        className="object-cover h-[10rem] w-[10rem]"
      />

      <div className="w-full flex flex-col gap-2">
        <h1 className="text-xl font-bold">{dormName}</h1>
        <p className="flex gap-1">
          STATUS: <span className="uppercase text-primary">{status}</span>
        </p>
        <p className="flex gap-1 items-center">
          <IoCalendarOutline className="text-primary" />
          {date}
        </p>
        <p className="flex gap-1 items-center">
          <IoLocationOutline className="text-primary" />
          {location}
        </p>

        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <a
            href={link}
            className="cursor-pointer flex gap-2 items-center py-2 rounded relative text-center justify-center text-md font-bold w-full bg-primary text-white text-sm"
          >
            View Listing
          </a>
          <Button
            color="secondary"
            onClick={() => setShowConfirmation(true)}
            className="text-sm"
          >
            Cancel Schedule
          </Button>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="m-4 bg-white p-4 rounded shadow-md">
            <p className=" text-center text-lg font-semibold">
              Are you sure you want to cancel the schedule?
            </p>
            <div className="flex gap-2 justify-end mt-4">
              <Button
                color="primary"
                onClick={handleCancelSchedule}
              >
                Yes
              </Button>
              <Button
                color="secondary"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Visit;
