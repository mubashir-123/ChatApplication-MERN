import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <>
      <form className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full h-10"
        />
        <button className="btn btn-circle btn-outline bg-sky-500 text-white"><IoSearchSharp className="w-6 h-6 outline-none"/></button>
      </form>
    </>
  );
};

export default SearchInput;
