"use client";

import React from "react";
import "../jobSelector/jobSelector.css";
import { usePathname } from "next/navigation";

export const JobSelector = () => {
  const pathname = usePathname();
  return (
    <main className="">
      {" "}
      <form
        className={`
    lg:h-32 py-3 w-full ${
      pathname === "/" && "job"
    } rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 flex flex-wrap items-center justify-center gap-2 md:gap-8  p-2 md:p-5 lg:p-0 ${
          pathname === "/" && "mt-40"
        }`}
      >
        {/* job type */}
        <select className="select select-bordered w-32 md:w-48 max-w-xs">
          <option disabled selected>
            Select Job Type
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        {/* job type */}

        {/* industry type */}
        <select className="select select-bordered w-48 max-w-xs">
          <option disabled selected>
            Select Industry
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        {/* industry type */}

        {/* mode of work*/}
        <select className="select select-bordered w-40 md:w-52 max-w-xs">
          <option disabled selected>
            Select Mode Of Work
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        {/* mode of work*/}

        {/* industry type */}
        <select className="select select-bordered w-32 lg:w-48 max-w-xs">
          <option disabled selected>
            Select Location
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        {/* industry type */}

        <button className="font-semibold text-lg bg-[#0DCAF0] py-2.5 px-5 text-white rounded-lg">
          Find Job
        </button>
      </form>
    </main>
  );
};
