"use client";

import React, { useEffect, useState } from "react";
import "./jobs.css";
import { JobSelector } from "../../components/Home/jobSelector/JobSelector";
import { JobLists } from "../../components/JobListlings/JobsList/JobLists";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { JobSkeleton } from "@/components/skeleton/JobSkeleton";
import { Pagination } from "@/components/pagination/Pagination";

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

interface JobsResponse {
  jobs: Job[];
  totalJobs: number;
  totalPages: number;
  currentPage: number;
}

const Jobs = () => {
  const [jobType, setJobType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async (filters = {}, page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get<JobsResponse>("/api/jobs", {
        params: { ...filters, page, limit: 10 },
      });
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filters = { jobType, companyName, position, country };
    fetchJobs(filters, 1);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchJobs({ jobType, companyName, position, country }, newPage);
  };

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

      {}

      <section className="mt-10">
        {loading ? (
          <JobSkeleton num={jobs?.length || 5} />
        ) : jobs?.length === 0 ? (
          <p className="font-bold mt-7 text-3xl text-center">
            There are no jobs available
          </p>
        ) : (
          jobs.map((j) => (
            <JobLists
              key={j._id}
              j={
                j as unknown as {
                  _id: string;
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

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  );
};

export default Jobs;
