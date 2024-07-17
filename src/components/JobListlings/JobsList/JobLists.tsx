"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./joblist.css";
import { CiClock2 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import { format } from "timeago.js";
import { useDispatch } from "react-redux";
import { applyJobs } from "@/redux/app/jobSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormatCurrency } from "@/libs/FormatCurrency";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";

type jobsType = {
  j: {
    id: string;
    companyImage: string;
    positions: string;
    companyName: string;
    createdAt: string;
    country: string;
    salary: string;
    jobType: string;
  };
};

export const JobLists = ({ j }: jobsType) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [hasApplied, setHasApplied] = useState(false);

  // console.log({ userId: session?.user?.id, jobId: j.id });

  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (session?.user?.id) {
        // Check local storage first
        const localStorageKey = `application_${session.user.id}_${j.id}`;
        const localStorageStatus = localStorage.getItem(localStorageKey);

        if (localStorageStatus) {
          setHasApplied(JSON.parse(localStorageStatus));
        } else {
          try {
            const response = await fetch(
              `/api/applications?userId=${session.user.id}&jobId=${j.id}`
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
  }, [session?.user?.id, j.id]);

  const router = useRouter();

  return (
    <main className=" border lg:border-0 m-2 px-2 rounded-lg">
      <section className="lg:w-10/12 mx-auto lg:border mb-4 md:h-[100px] p-5 md:flex justify-between items-center rounded-lg lg:shadow-lg">
        <Link
          href={`/jobs/${j.id}`}
          className="flex items-center gap-5 flex-1 mb-2 lg:mb-0"
        >
          <Image
            src={j.companyImage}
            alt="company-logo"
            width={56}
            height={56}
            className="h-14 w-14 shadow-lg p-3 rounded-lg object-cover"
          />
          <div className=" mt-4">
            <h4 className=" font-semibold">{j.positions}</h4>
            <p>{j.companyName}</p>
          </div>
        </Link>

        <div className=" flex-1">
          <p className="text-[#0DCAF0] capitalize text-sm mode w-fit px-3 p-2">
            {j.jobType}
          </p>
          <p className=" text-gray-400 mt-2 flex items-center gap-1">
            <span>
              <CiClock2 size={24} />
            </span>{" "}
            Posted {format(j.createdAt)}
          </p>
        </div>

        <div className=" flex flex-col  flex-1">
          <p className=" flex items-center gap-1 text-gray-400">
            <span>
              <IoLocationOutline size={24} />
            </span>{" "}
            {j.country}
          </p>

          <p className="mt-1 ml-2">{FormatCurrency(j.salary, "USD")}</p>
        </div>
        <div className="mt-2 lg:mt-0">
          {session?.user?.role !== "employer" && (
            <button
              className={`text-[16px] py-2 px-3 text-white rounded-lg ${
                hasApplied ? "bg-gray-400 cursor-not-allowed" : "bg-[#0DCAF0]"
              }`}
              // onClick={handleApplyForJob}
              onClick={() => router.push(`/jobs/${j.id}/application`)}
              disabled={hasApplied}
            >
              {hasApplied ? "Applied" : "Apply Now"}
            </button>
          )}

          {session?.user?.role === "employer" && (
            <Link href={`/jobs/applicant/${j.id}`} className=" text-sm">
              View Applicants
            </Link>
          )}
        </div>
      </section>

      {/* pagination */}
    </main>
  );
};
