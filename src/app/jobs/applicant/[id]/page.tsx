"use client";

import { ApplicantDetail } from "@/components/JobListlings/applicants/ApplicantDetails";
import { JobLists } from "@/components/JobListlings/JobsList/JobLists";
import { getApplliedJobs } from "@/redux/app/jobSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Applied = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const { appliedJobs } = useSelector((state: RootState) => state.jobs); // Explicitly define state type as RootState
  const { id } = params;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getApplliedJobs(id));
  }, [id]);

  console.log(appliedJobs.results);

  return (
    <main className="w-11/12 mx-auto mb-10">
      <section className="mt-10">
        {appliedJobs?.results?.map((j) => (
          <ApplicantDetail key={j.id} j={j} />
        ))}
        {/* pagination */}
      </section>
    </main>
  );
};

export default Applied;

// Define RootState type to help TypeScript infer state types correctly
interface RootState {
  jobs: {
    appliedJobs: {
      results: any[]; // Adjust this type if you know the structure of the results
    };
    // Add other state properties here as needed
  };
  // Add other slice states here as needed
}