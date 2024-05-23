import { IoCalendarOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import Button from "./Button";

function Visit({ img, date, dormName, status, location, link }) {
  return (
    <div className="items-center bg-white shadow-custom w-full flex p-4 gap-4 lg:w-[28rem] xl:w-[40rem]">
      <img
        src={img}
        className="object-cover h-[10rem] w-[10rem]"
      />

      <div className="w-full flex flex-col gap-2">
        <h1 className="text-xl font-bold">{dormName}</h1>
        <p className="flex gap-1">
          STATUS:
          <span className="uppercase text-primary">{status}</span>
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
          {" "}
          <a
            href={link}
            className="cursor-pointer flex gap-2 items-center py-2 rounded relative text-center justify-center text-md font-bold w-full bg-primary text-white text-sm"
          >
            View Listing
          </a>
          <Button
            className="text-sm "
            color="secondary"
          >
            Cancel Schedule
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Visit;
