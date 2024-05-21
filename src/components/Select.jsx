import { IoIosArrowDown } from "react-icons/io";

function Select() {
  return (
    <div className="relative">
      <IoIosArrowDown className="text-primary text-xl absolute -translate-x-3 translate-y-3 right-0" />
      <input
        type="text"
        placeholder="Where do you want to live?"
        className="rounded border border-[#6F7070] p-2 pr-10 bg-transparent text-md"
      />
    </div>
  );
}

export default Select;
