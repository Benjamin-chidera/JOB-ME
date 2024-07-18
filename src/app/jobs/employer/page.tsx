"use client";

import { EmployerJobList } from "@/components/JobListlings/employerJobLists/EmployerJobList";
import { JobLists } from "@/components/JobListlings/JobsList/JobLists";
import { getEmployerJobs } from "@/redux/app/jobSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { JobSkeleton } from "@/components/skeleton/JobSkeleton";

const Employer = () => {
  const dispatch = useAppDispatch();
  const { employerJobs, status } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getEmployerJobs());
  }, []);

  return (
    <main className=" w-full mx-auto mb-10">
      {status === "loading" ? (
        <JobSkeleton num={employerJobs.length || 5} />
      ) : employerJobs.length === 0 ? (
        <p className=" font-bold mt-7 text-3xl text-center">There are no jobs posted by any employer</p>
      ) : (
        employerJobs.map((j) => <EmployerJobList key={j.id} j={j} />)
      )}
    </main>
  );
};

export default Employer;
