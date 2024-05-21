import { IoSearch } from "react-icons/io5";

function SearchBar() {
  return (
    <div className="relative">
      <IoSearch className="text-primary text-xl absolute translate-x-3 translate-y-2.5" />
      <input
        type="text"
        placeholder="Where do you want to live?"
        className="rounded border border-[#6F7070] p-2 pl-10 bg-transparent text-md"
      />
    </div>
  );
}

export default SearchBar;
