"use client"

import { getApplliedJobs } from "@/redux/app/jobSlice";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Applied = () => {
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const userId = session?.user?.id;
  console.log(userId);

  useEffect(() => {
    

    dispatch(getApplliedJobs(userId));
  }, []);

  return <main className=" w-11/12 mx-auto mb-10">Applied</main>;
};

export default Applied;
