import Image from "next/image";
import React from "react";
import "./joblist.css";
import { CiClock2 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";

export const JobLists = ({
  position,
  time,
  mode,
  company,
  location,
  salary,
  logo,
  id
}) => {
  return (
    <main className=" mx-5 border lg:border-0 m-2 px-2 rounded-lg">
      <Link
        href={`/jobs/${id}`}
        className="lg:w-[1020px] mx-auto lg:border mb-4 md:h-[100px] p-5 md:flex justify-between items-center rounded-lg lg:shadow-lg"
      >
        <div className="flex items-center gap-5 flex-1 mb-2 lg:mb-0">
          <Image
            src={logo}
            alt="company-logo"
            className="h-14 w-14 shadow-lg p-3 rounded-lg object-cover"
          />
          <div className=" mt-4">
            <h4 className=" font-semibold">{position}</h4>
            <p>{company}</p>
          </div>
        </div>

        <div className=" flex-1">
          <p className="text-[#0DCAF0] capitalize text-sm mode w-fit px-3 p-2">
            {mode}
          </p>
          <p className=" text-gray-400 mt-2 flex items-center gap-1">
            <span>
              <CiClock2 size={24} />
            </span>{" "}
            Posted {time}
          </p>
        </div>

        <div className=" flex flex-col  flex-1">
          <p className=" flex items-center gap-1 text-gray-400">
            <span>
              <IoLocationOutline size={24} />
            </span>{" "}
            {location}
          </p>

          <p className="mt-1 ml-2">${salary}</p>
        </div>
        <div className="mt-2 lg:mt-0">
          <button className=" text-[16px] bg-[#0DCAF0] py-2 px-3 text-white rounded-lg">
            Apply Now
          </button>
        </div>
      </Link>

      {/* pagination */}
    </main>
  );
};
