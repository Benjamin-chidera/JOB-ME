"use client";

import React, { useEffect, useState } from "react";
import "./jobs.css";
import { JobSelector } from "../../components/Home/jobSelector/JobSelector";
import { JobLists } from "../../components/JobListlings/JobsList/JobLists";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { JobSkeleton } from "@/components/skeleton/JobSkeleton";

interface Job {
  _id: string;
  companyImage: string;
  positions: string;
  companyName: string;
  createdAt: string;
  country: string;
  salary: string;
  jobType: string;
}

const Jobs = () => {
  const [jobType, setJobType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    try {
      const { data } = await axios.get<Job[]>("/api/jobs", {
        params: filters,
      });
      const jobsWithStringId = data.map((job) => ({
        ...job,
        id: job._id.toString(), // Convert id to string
      }));
      setJobs(jobsWithStringId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <div className=" w-10/12 mx-auto">
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
        </div>
      </section>

      <section className="mt-10">
        {loading ? (
          <JobSkeleton num={jobs.length || 5} />
        ) : (
          jobs.map((j) => (
            <JobLists
              key={j._id}
              j={
                j as unknown as {
                  id: string;
                  companyImage: string;
                  positions: string;
                  companyName: string;
                  createdAt: string;
                  country: string;
                  salary: string;
                  jobType: string;
                }
              }
            />
          ))
        )}
        {/* pagination */}
      </section>
    </main>
  );
};

export default Jobs;
