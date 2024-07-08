import React from "react";
import fb from "../../../../public/fb.png";
import lk from "../../../../public/lk.png";
import insta from "../../../../public/insta.png";
import x from "../../../public/x.png";
import Image from "next/image";

const jobs = [
  {
    id: 1,
    position: "Digital Marketer",
    time: "24 hours ago",
    mode: "full time",
    company: "Google",
    location: "United Kingdom",
    salary: "30k - 35k",
    logo: insta,
  },
  {
    id: 2,
    position: "Web developer",
    time: "2 days ago",
    mode: "full time",
    company: "Facebook",
    location: "Australia",
    salary: "30k - 40k",
    logo: fb,
  },
  {
    id: 3,
    position: "UI/UX Designer",
    time: "3 hours ago",
    mode: "remote",
    company: "LinkedIn",
    location: "South Africa",
    salary: "28k - 34k",
    logo: lk,
  },
];

export const RelatedJobs = () => {
  return (
    <main className=" w-11/12 mx-auto">
      <section className=" mt-10 flex justify-center items-center flex-wrap mx-auto gap-10">
        {jobs.map((job) => (
          <div key={job.id} className="w-[300px] border rounded-xl text-start">
            <div className="p-5">
              <h2>{job.position}</h2>
              <p>Posted {job.time}</p>
              <div className="flex items-center justify-between">
                <p>{job.mode}</p>
                <p>{job.salary}</p>
              </div>
            </div>
            <hr />

            <div className="p-5 ">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={job.logo}
                  alt="company-logo"
                  width={40}
                  height={40}
                  className=" shadow-xl p-1 rounded-xl"
                />
                <div>
                  <p className=" font-semibold">{job.company}</p>
                  <p className=" text-xs text-gray-400">{job.location}</p>
                </div>
              </div>

              <button className="font-medium bg-[#0DCAF0] py-1 px-3 text-[14px] text-white rounded-lg">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
