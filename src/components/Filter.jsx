import { useState } from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";
import { IoFilter } from "react-icons/io5";

function Filter() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="w-[10rem] relative">
      <Button
        color="white"
        onClick={toggleFilter}
        className="flex gap-2 items-center"
      >
        <IoFilter className="text-primary font-bold" />
        Filter
      </Button>
      {isFilterVisible && (
        <div className="absolute z-10 w-full bg-white border border-[#6F7070] rounded mt-1 max-h-60 overflow-y-auto shadow-lg p-2">
          <Checkbox
            label="Filter"
            onChange={() => {}}
          />
        </div>
      )}
    </div>
  );
}

export default Filter;
