"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import "../JobsList/joblist.css";
import { CiClock2 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import { format } from "timeago.js";
import { useDispatch } from "react-redux";
import { applyJobs } from "@/redux/app/jobSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";

type jobsType = {
  j: {
    _id: string;
    job: string;
    companyImage: string;
    positions: string;
    companyName: string;
    createdAt: string;
    country: string;
    salary: string;
    jobType: string;
    phonenumber: string;
    user: {
      firstname: string;
      lastname: string;
      email: string;
    };
  };
};

export const ApplicantDetail = ({ j }: jobsType) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (session?.user?.id) {
        // Check local storage first
        const localStorageKey = `application_${session.user.id}_${j._id}`;
        const localStorageStatus = localStorage.getItem(localStorageKey);

        if (localStorageStatus) {
          setHasApplied(JSON.parse(localStorageStatus));
        } else {
          try {
            const response = await fetch(
              `/api/applications?userId=${session.user.id}&jobId=${j._id}`
            );
            const data = await response.json();
            setHasApplied(data.applied);
            // Save to local storage
            localStorage.setItem(localStorageKey, JSON.stringify(data.applied));
          } catch (error) {
            console.error("Failed to check application status:", error);
          }
        }
      }
    };

    checkApplicationStatus();
  }, [session?.user?.id, j._id]);


  const router = useRouter();

  return (
    <main className=" mx-5 border lg:border-0 m-2 px-2 rounded-lg">
      <section className="lg:w-[1020px] mx-auto lg:border mb-4 md:h-[100px] p-5 md:flex justify-between items-center rounded-lg lg:shadow-lg">
        <Link
          href={`/jobs/${j.job}`}
          className="flex items-center gap-5 flex-1 mb-2 lg:mb-0 text-xs"
        >
          Job Details
        </Link>

        <div className=" flex-1">
          <p className="text-[#0DCAF0] capitalize text-sm mode w-fit px-3 p-2">
            {j.user.firstname} {j.user.lastname}
          </p>
          <p className=" text-gray-400 mt-2 flex items-center gap-1  text-xs">
            <span>
              <CiClock2 size={24} />
            </span>{" "}
            Applied {format(j.createdAt)}
          </p>
        </div>

        <div className=" flex flex-col  flex-1">
          <p className=" flex items-center gap-1 text-gray-400  text-xs">
            <span>
              <IoLocationOutline size={24} />
            </span>{" "}
            {j.phonenumber}
          </p>

          <p className="mt-1 ml-2  text-xs">{j.user.email}</p>
        </div>
        <div className="mt-2 lg:mt-0">
          {session?.user?.role !== "employer" && (
            <button
              className={`text-[16px] py-2 px-3 text-white rounded-lg ${
                hasApplied ? "bg-gray-400 cursor-not-allowed" : "bg-[#0DCAF0]"
              }`}
              // onClick={handleApplyForJob}
              onClick={() => router.push(`/jobs/${j._id}/application`)}
              disabled={hasApplied}
            >
              {hasApplied ? "Applied" : "Apply Now"}
            </button>
          )}

          {session?.user?.role === "employer" && (
            <Link
              href={`/jobs/applicant/details/${j._id}`}
              className=" text-xs"
            >
              View Applicant Details
            </Link>
          )}
        </div>
      </section>

      {/* pagination */}
    </main>
  );
};
