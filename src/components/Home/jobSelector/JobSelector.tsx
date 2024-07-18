"use client";

import React, { useEffect } from "react";
import "../jobSelector/jobSelector.css";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "@/redux/app/jobSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";

type searchType = {
  jobType: string;
  setJobType: React.Dispatch<React.SetStateAction<string>>;
  companyName: string;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  position: string;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: React.FormEventHandler<HTMLFormElement> | undefined;
};

export const JobSelector = ({
  jobType,
  setJobType,
  companyName,
  setCompanyName,
  position,
  setPosition,
  country,
  setCountry,
  handleSearch,
}: searchType) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  const { allJobs } = useAppSelector((state) => state.jobs);

  const uniqueCompanies = Array.from(
    new Set(allJobs?.jobs?.map((job) => job.companyName) || [])
  );

  const uniqueCountries = Array.from(
    new Set(allJobs?.jobs?.map((job) => job.country))
  );

  const uniquePositions = Array.from(
    new Set(allJobs?.jobs?.map((job) => job.positions))
  );

  // console.log(allJobs);
  

  return (
    <main>
      <form
        className={`lg:h-28 py-2 w-full ${
          pathname === "/" && "job"
        } rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 flex flex-wrap items-center justify-center gap-2 md:gap-8 p-2 md:p-5 lg:p-0 ${
          pathname === "/" && "mt-40"
        }`}
        onSubmit={handleSearch}
      >
        {/* job type */}
        <select
          className="select select-bordered w-36 max-w-xs"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option disabled selected>
            Select Job Type
          </option>
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Contract</option>
          <option>Remote</option>
          <option>Internship</option>
        </select>

        {/* industry type */}
        <select
          className="select select-bordered w-36 max-w-xs"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        >
          <option disabled selected>
            Select Industry
          </option>
          {uniqueCompanies.map((company) => (
            <option key={company}>{company}</option>
          ))}
        </select>

        {/* mode of work */}
        <select
          className="select select-bordered w-36 max-w-xs"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <option disabled selected>
            Select Position
          </option>
          {uniquePositions.map((position) => (
            <option key={position}>{position}</option>
          ))}
        </select>

        {/* location */}
        <select
          className="select select-bordered w-36 max-w-xs"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option disabled selected>
            Select Location
          </option>
          {uniqueCountries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>

        <button
          className="font-semibold text-lg bg-[#0DCAF0] py-2.5 px-5 text-white rounded-lg"
          type="submit"
        >
          Find Job
        </button>
      </form>
    </main>
  );
};
