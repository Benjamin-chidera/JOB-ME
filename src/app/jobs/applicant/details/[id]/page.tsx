"use client";

// Define RootState interface in a store file (e.g., store/index.ts)
// Ensure this matches your actual state structure
export interface RootState {
  jobs: {
    applicantJobDetails: any; // Adjust type as needed
    allJobs: any[]; // Adjust type as needed
    // Add other state properties here as needed
  };
  // Add other slice states here as needed
}

// Modify your component to use RootState and proper useSelector typing

import React, { useEffect, useState } from "react";
import map from "../../../../../../public/map.png";
import Image from "next/image";
import { CiClock2, CiUser } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { GoBriefcase } from "react-icons/go";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RelatedJobs } from "@/components/JobListlings/relatedJobs/RelatedJobs";
import { useDispatch, useSelector } from "react-redux";
import {
  applyJobs,
  getAllJobs,
  getApplicantJobDetails,
  getEmployerJobsDetails,
} from "@/redux/app/jobSlice";
import { format } from "timeago.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";
import { PDFViewer } from "@react-pdf/renderer";
import { MyPdf } from "@/components/pdf/MyPdf";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";

const ApplicantsDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { applicantJobDetails, allJobs } = useAppSelector(
    (state: RootState) => state.jobs
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getApplicantJobDetails(id));
    dispatch(getAllJobs());
  }, [id, dispatch]);

  const isRelated = allJobs.filter(
    (job) => job?.positions === applicantJobDetails?.positions
  );

  const sliceRelatedJobs = isRelated?.slice(0, 3);
  console.log({ sliceRelatedJobs });

  console.log(applicantJobDetails);
  

  return (
    <main className=" mt-10">
      <section className="lg:flex justify-center gap-14 mb-10 w-11/12 mx-auto">
        <section>
          <div className=" bg-[#DBF7FD] p-7 rounded-xl w-[500px] max-w-full">
            <Image
              src={applicantJobDetails?.companyImage}
              alt="company-logo"
              width={40}
              height={40}
              className="w-10 h-10 shadow-lg"
            />
            <h2 className=" font-semibold text-2xl mt-3">
              {applicantJobDetails?.positions}
            </h2>
            <p className=" max-w-md my-3">{applicantJobDetails?.description}</p>

            <p className=" mt-10 font-semibold text-xl">Job Information:</p>

            <section className=" bg-white shadow-xl p-5 w-fit mt-3 rounded-xl border-2 flex flex-col gap-2">
              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <CiUser size={20} />
                </span>{" "}
                Employment Type:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {applicantJobDetails?.jobType}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <IoLocationOutline size={20} />
                </span>{" "}
                Location:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {applicantJobDetails?.country}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <CiClock2 size={20} />
                </span>{" "}
                Date Posted:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {format(applicantJobDetails?.created_at)}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <GoBriefcase size={20} />
                </span>{" "}
                Experience:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {applicantJobDetails?.experience}{" "}
                  {applicantJobDetails?.experience > 2 ? "Year" : "Years"}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <BsCurrencyDollar size={20} />
                </span>{" "}
                Salary:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {applicantJobDetails?.salary}
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

          {/* <PDFViewer>
            <MyPdf applicantJobDetails={applicantJobDetails} />
          </PDFViewer> */}
        </section>
      </section>

      <section className=" mt-24 mb-10">
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

export default ApplicantsDetails;
