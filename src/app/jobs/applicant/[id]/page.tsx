"use client";

import { ApplicantDetail } from "@/components/JobListlings/applicants/ApplicantDetails";
import { JobLists } from "@/components/JobListlings/JobsList/JobLists";
import { getApplliedJobs } from "@/redux/app/jobSlice";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Applied = ({ params }) => {
  const { data: session } = useSession();
  const { appliedJobs } = useSelector((state) => state.jobs);
  const { id } = params;

  const dispatch = useDispatch();
  // console.log(appliedJobs?.applicants);

  useEffect(() => {
    dispatch(getApplliedJobs(id));
  }, [id]);

  return (
    <main className=" w-11/12 mx-auto mb-10">
      <section className="mt-10">
        {appliedJobs?.applicants?.map((j) => (
          <ApplicantDetail key={j.id} j={j} />
        ))}
        {/* pagination */}
      </section>
    </main>
  );
};

export default Applied;
