"use client";

import React, { useEffect, useState } from "react";
import "./jobs.css";
import { JobSelector } from "../../components/Home/jobSelector/JobSelector";
import { JobLists } from "../../components/JobListlings/JobsList/JobLists";
import axios from "axios";

const Jobs = () => {
  const [jobType, setJobType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async (filters = {}) => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/jobs", {
        params: filters,
      });
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    const filters = { jobType, companyName, position, country };
    fetchJobs(filters);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="mb-10">
      <div className="col h-14 w-full"></div>

      <section className="jobsSelector lg:h-32 w-full flex items-center justify-center">
        <JobSelector
          jobType={jobType}
          setJobType={setJobType}
          companyName={companyName}
          setCompanyName={setCompanyName}
          position={position}
          setPosition={setPosition}
          country={country}
          setCountry={setCountry}
          handleSearch={handleSearch}
        />
      </section>

      <section className="mt-10">
        {jobs?.map((j) => (
          <JobLists key={j.id} j={j} />
        ))}
        {/* pagination */}
      </section>
    </main>
  );
};

export default Jobs;
