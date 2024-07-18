"use client";

import React from "react";
import fb from "../../../../public/fb.png";
import lk from "../../../../public/lk.png";
import insta from "../../../../public/insta.png";
import x from "../../../public/x.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { useRouter } from "next/navigation";
import { CiClock2 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { FormatCurrency } from "@/libs/FormatCurrency";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { LatestJobSkeleton } from "@/components/skeleton/LatestJobSkeleton";

export const LatestJobs = () => {
  const { allJobs, status } = useAppSelector((state) => state.jobs);

  const getThree = allJobs?.jobs?.slice(0, 6) || [];
  console.log(getThree);

  const router = useRouter();
  const { data: session } = useSession();

  return (
    <main className=" text-center w-11/12 mx-auto mt-6 mb-10">
      <h3 className="font-semibold text-2xl">Latest Job Listings</h3>
      <p className=" max-w-[1000px] mx-auto mt-4">
        Lorem ipsum dolor sit amet consectetur. Augue lacus senectus at amet
        viverra ultrices eget. Tincidunt tristique viverra facilisis arcu non
        nulla faucibus. Adipiscing blandit nunc lobortis pretium. Tempus viverra
        vitae nisl imperdiet auctor mattis viverra egestas mattis.
      </p>

      <section className=" mt-10 flex justify-center place-items-center gap-10 items-center flex-wrap mx-auto lg:grid lg:grid-cols-3 lg:gap-5 lg:w-fit">
        {status === "loading" ? (
          <LatestJobSkeleton num={getThree?.length || 3} />
        ) : getThree?.length === 0 ? (
          <p className=" font-bold mt-7 text-3xl">There are no latest job</p>
        ) : (
          getThree?.map((job) => (
            <div
              key={job.id}
              className="w-[300px] border rounded-xl text-start"
            >
              <div className="p-5">
                <Link href={`/jobs/${job._id}`}>
                  <h2 className=" font-semibold text-xl">{job.positions}</h2>

                  <p className=" text-gray-400 mt-2 flex items-center gap-1 mb-2">
                    <span>
                      <CiClock2 size={24} />
                    </span>{" "}
                    Posted {format(job.createdAt)}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-[#0DCAF0] capitalize text-sm mode w-fit px-3 p-2">
                      {job.jobType}
                    </p>
                    <p className=" font-semibold">
                      {FormatCurrency(job.salary, "USD")}
                    </p>
                  </div>
                </Link>
              </div>
              <hr />

              <div className="p-5 ">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={job.companyImage}
                    alt="company-logo"
                    width={40}
                    height={40}
                    className=" shadow-xl p-1 rounded-xl"
                  />
                  <div>
                    <p className=" font-semibold">{job.companyName}</p>
                    <p className=" flex items-center gap-1 text-gray-400">
                      <span>
                        <IoLocationOutline size={24} />
                      </span>{" "}
                      {job.country}
                    </p>
                  </div>
                </div>

                {session?.user?.role !== "employer" && (
                  <button
                    className="font-medium bg-[#0DCAF0] py-1 px-3 text-[14px] text-white rounded-lg"
                    onClick={() => router.push(`/jobs/${job.id}/application`)}
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};
