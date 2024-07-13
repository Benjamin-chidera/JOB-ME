"use client";

import { EmployerJobList } from "@/components/JobListlings/employerJobLists/EmployerJobList";
import { JobLists } from "@/components/JobListlings/JobsList/JobLists";
import { getEmployerJobs } from "@/redux/app/jobSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";

const Employer = () => {
  const dispatch = useAppDispatch();
  const { employerJobs } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getEmployerJobs());
  }, []);

  return (
    <main className=" w-full mx-auto mb-10">
      {employerJobs.map((j) => (
        <EmployerJobList key={j.id} j={j} />
      ))}
    </main>
  );
};

export default Employer;
