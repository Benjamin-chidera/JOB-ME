"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { getApplliedJobs } from "@/redux/app/jobSlice";

const Applied = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(getApplliedJobs(userId));
    }
  }, [dispatch, userId]);

  const { appliedJobs, status, error } = useAppSelector((state) => state.jobs);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="w-11/12 mx-auto mb-10">
      <h1>Applied Jobs</h1>
      <ul>
        {/* {appliedJobs.map((job) => (
          <li key={job.jobId}>{job.position}</li>
        ))} */}
      </ul>
    </main>
  );
};

export default Applied;
