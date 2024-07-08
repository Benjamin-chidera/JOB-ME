import React from "react";
import fb from "../../../public/fb.png";
import lk from "../../../public/lk.png";
import insta from "../../../public/insta.png";
import x from "../../../public/x.png";
import "./jobs.css";
import { JobSelector } from "../../components/Home/jobSelector/JobSelector";
import { JobLists } from "../../components/JobListlings/JobsList/JobLists";

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
  {
    id: 4,
    position: "Mobile App Developer",
    time: "3 hours ago",
    mode: "remote",
    company: "Twitter",
    location: "United States",
    salary: "28k - 34k",
    logo: x,
  },
];

const Jobs = () => {
  return (
    <main className=" mb-10">
      <div className="col h-14 w-full"></div>

      <section className="jobsSelector lg:h-32 w-full flex items-center justify-center">
        <JobSelector />
      </section>

      <section className=" mt-10">
        {jobs.map((j) => (
          <JobLists key={j.id} {...j} />
        ))}

        {/* pagination */}
      </section>
    </main>
  );
};

export default Jobs;
