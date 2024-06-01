import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function Select({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <IoIosArrowDown
        className="text-primary text-xl absolute right-0 top-1/2 transform -translate-y-1/2 mr-3 cursor-pointer"
        onClick={toggleDropdown}
      />
      <input
        type="text"
        placeholder="Select your price range"
        value={selectedOption}
        onClick={toggleDropdown}
        readOnly
        className="md:w-[13rem] lg:w-[20rem] w-full rounded border border-[#6F7070] p-2 pr-10 bg-transparent text-md cursor-pointer"
      />
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-[#6F7070] rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
