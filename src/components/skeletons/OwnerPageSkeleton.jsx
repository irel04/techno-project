import React from 'react';
import { MdOutlineMail, MdOutlinePhoneInTalk } from 'react-icons/md';


function OwnerPageSkeleton() {
  return (
    <main className="flex flex-col gap-5 my-[3rem] mx-[5%]">
      <section className="flex flex-col md:flex-row gap-2 md:gap-10 items-center animate-pulse">
        <div className="bg-gray-300 w-[10rem] h-[10rem] rounded-full" />
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="bg-gray-300 w-48 h-8 rounded-md" />
          <p className="flex gap-1 items-center">
            <MdOutlineMail className="text-gray-300" />
            <span className="bg-gray-300 w-32 h-5 rounded-md" />
          </p>
          <p className="flex gap-1 items-center">
            <MdOutlinePhoneInTalk className="text-gray-300" />
            <span className="bg-gray-300 w-32 h-5 rounded-md" />
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 justify-between gap-4 animate-pulse">
        <div className="w-full bg-gray-300 rounded border p-4 text-center flex flex-col gap-2">
          <p className="text-gray-300 font-bold text-sm uppercase">
            Verified Listings
          </p>
          <span className="bg-gray-300 w-full h-8 rounded-md" />
        </div>

        <div className="w-full bg-gray-300 rounded border p-4 text-center flex flex-col gap-2">
          <p className="text-gray-300 font-bold text-sm uppercase">
            User Favorites
          </p>
          <span className="bg-gray-300 w-full h-8 rounded-md" />
        </div>

        <div className="w-full bg-gray-300 rounded border p-4 text-center flex flex-col gap-2">
          <p className="text-gray-300 font-bold text-sm uppercase">
            Joined Date
          </p>
          <span className="bg-gray-300 w-full h-8 rounded-md" />
        </div>
      </section>

      {/* List of Dorm Listings */}
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
        {Array(4).fill(0).map((_, index) => (
          <li key={index} className="flex flex-col gap-2">
            <div className="bg-gray-300 w-full h-48 rounded-md" />
            <div className="bg-gray-300 w-3/4 h-5 rounded-md" />
            <div className="bg-gray-300 w-1/2 h-5 rounded-md" />
            <div className="bg-gray-300 w-1/4 h-5 rounded-md" />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default OwnerPageSkeleton;
