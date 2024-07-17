"use client";

import React, { useEffect, useState } from "react";
import insta from "../../../../../public/insta.png";
import map from "../../../../../public/map.png";
import Image from "next/image";
import { CiClock2, CiUser } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { GoBriefcase } from "react-icons/go";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RelatedJobs } from "@/components/JobListlings/relatedJobs/RelatedJobs";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, getEmployerJobsDetails } from "@/redux/app/jobSlice";
import { format } from "timeago.js";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";

interface EmployerJobDetail {
  responsibilities?: string | string[]; // Update to handle both string and string[]
  skills?: string | string[]; // Update to handle both string and string[]
  positions: string;
  companyImage: string;
  description: string;
  jobType: string;
  country: string;
  createdAt: string;
  experience: number;
  salary: number;
  id: string;
}

const EmployerJobDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const dispatch = useAppDispatch();
  const { employerJobsDetail, allJobs } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getEmployerJobsDetails(id));
    dispatch(getAllJobs());
  }, [id]);

  const responsibilities: string[] = Array.isArray(
    employerJobsDetail?.responsibilities
  )
    ? employerJobsDetail.responsibilities
    : [employerJobsDetail?.responsibilities || ""];

  const skills: string[] = Array.isArray(employerJobsDetail?.skills)
    ? employerJobsDetail.skills
    : [employerJobsDetail?.skills || ""];

  const isRelated = allJobs.filter(
    (job: EmployerJobDetail) => job.positions === employerJobsDetail?.positions
  );

  const sliceRelatedJobs = isRelated?.slice(0, 3);
  // console.log({ sliceRelatedJobs });

  const createdDate = employerJobsDetail?.createdAt
    ? new Date(employerJobsDetail.createdAt)
    : new Date();
  const experience = employerJobsDetail?.experience ?? 0;
  const salary = employerJobsDetail?.salary ?? 0;

  return (
    <main className=" mt-10">
      <section className="lg:flex justify-between gap-7 mb-10 w-10/12 mx-auto">
        <section>
          <div className=" bg-[#DBF7FD] p-7 rounded-xl w-[500px] max-w-full">
            <Image
              src={employerJobsDetail?.companyImage || ""}
              alt="company-logo"
              width={40}
              height={40}
              className="w-10 h-10 shadow-lg"
            />
            <h2 className=" font-semibold text-2xl mt-3">
              {employerJobsDetail?.positions}
            </h2>
            <p className=" max-w-md my-3">{employerJobsDetail?.description}</p>

            <p className=" mt-10 font-semibold text-xl">Job Information:</p>

            <section className=" bg-white shadow-xl p-5 w-fit mt-3 rounded-xl border-2 flex flex-col gap-2">
              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <CiUser size={20} />
                </span>{" "}
                Employment Type:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {employerJobsDetail?.jobType}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <IoLocationOutline size={20} />
                </span>{" "}
                Location:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {employerJobsDetail?.country}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <CiClock2 size={20} />
                </span>{" "}
                Date Posted:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {format(createdDate)}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <GoBriefcase size={20} />
                </span>{" "}
                Experience:{" "}
                <span className="text-blue-300 font-medium">
                  {employerJobsDetail?.experience}{" "}
                  {experience > 2 ? "Year" : "Years"}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <BsCurrencyDollar size={20} />
                </span>{" "}
                Salary:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {employerJobsDetail?.salary}
                </span>
              </p>
            </section>
          </div>

          <div className=" mt-4">
            <Image
              src={map}
              alt="map"
              className=" w-[500px] max-w-full h-[400px] object-cover rounded-xl"
            />
          </div>
        </section>
        <section className="mx-5 lg:mx-0 mt-7 lg:mt-0">
          <h2 className=" font-semibold text-2xl">Job Description:</h2>
          <p className="max-w-4xl my-5">{employerJobsDetail?.description}</p>

          <section className=" mt-10">
            {/*   Duties & Responsibilities: */}
            <h2 className=" font-semibold text-2xl">
              Duties & Responsibilities:
            </h2>

            <div className=" mt-5">
              <ul className=" space-y-3">
                {responsibilities.map((item, index) => (
                  <li
                    key={index}
                    className=" flex md:items-center gap-2 font-[500]"
                  >
                    <span>
                      <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className=" mt-10">
            {/*  Skills & Qualifications: */}
            <h2 className=" font-semibold text-2xl">
              Skills & Qualifications:
            </h2>

            <div className=" mt-5">
              <ul className=" space-y-3">
                {skills.map((item, index) => (
                  <li
                    key={index}
                    className=" flex md:items-center gap-2 font-[500]"
                  >
                    <span>
                      <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </section>
      </section>

      <section className=" mt-24 mb-10 w-10/12 mx-auto">
        <div className=" text-center">
          <h2 className=" font-semibold text-xl">Related Jobs</h2>
          <p className=" font-medium">
            Lorem ipsum dolor sit amet consectetur. Risus tempus eget egestas
            dolor ut. At interdum amet id duis pulvinar quis massa elit. Amet
            quam commodo est pulvinar vitae.
          </p>
        </div>

        <div className=" mt-10">
          <RelatedJobs sliceRelatedJobs={sliceRelatedJobs} />
        </div>
      </section>
    </main>
  );
};

export default EmployerJobDetails;
