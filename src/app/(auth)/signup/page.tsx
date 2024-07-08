import React from "react";
import seeker from "../../../../public/seeker.png";
import employer from "../../../../public/employer.png";
import Image from "next/image";
import SignupComponent from "@/components/auth/signup/signup";
import Link from "next/link";

const Signup = () => {
  return (
    <div>
      <main className="flex items-center justify-center h-screen flex-col pt-32 lg:pt-0 pb-10">
        <div className=" text-center">
          <h3 className=" font-semibold text-2xl">
            Are you an <span className=" text-[#0DCAF0]">employer</span> or a{" "}
            <span className=" text-[#0DCAF0]">job seeker</span>?
          </h3>
          <p className=" text-lg font-semibold">Sign Up to get started</p>
        </div>

        <section className=" pt-10 lg:pt-14 lg:flex items-center gap-10">
          <div className=" border-4 w-[350px] lg:w-[400px] max-w-full mx-2 py-6 rounded-xl">
            <Image
              src={seeker}
              className=" w-20 h-20 mx-auto"
              alt="job-seeker-img"
            />

            <h2 className=" font-semibold text-xl text-center my-3 lg:text-2xl">
              I am a Job seeker
            </h2>
            <p className=" font-semibold text-[16px] max-w-xs mx-auto text-center my-3">
              Lorem ipsum dolor sit amet consectetur. Faucibus pulvinar sem quam
              ac. Interdum vestibulum sed varius mollis at dignissim convallis
              amet.
            </p>

            <div className=" text-center">
              <Link
                href={"/signup/jobSeeker"}
                className="bg-[#0DCAF0] px-3 py-2 text-sm text-white rounded-xl"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div className=" border-4 w-[350px] lg:w-[400px] max-w-full mx-2 py-6 rounded-xl mt-5 lg:mt-0">
            <Image
              src={employer}
              className=" w-20 h-20 mx-auto"
              alt="job-seeker-img"
            />

            <h2 className=" font-semibold text-xl text-center my-3 lg:text-2xl">
              I am an Employer
            </h2>
            <p className=" font-semibold text-[16px] max-w-xs mx-auto text-center my-3">
              Lorem ipsum dolor sit amet consectetur. Faucibus pulvinar sem quam
              ac. Interdum vestibulum sed varius mollis at dignissim convallis
              amet.
            </p>

            <div className=" text-center">
              <Link
                href={"/signup/employer"}
                className="bg-[#0DCAF0] px-3 py-2 text-sm text-white rounded-xl"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;
