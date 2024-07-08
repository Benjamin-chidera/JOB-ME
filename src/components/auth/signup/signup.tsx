"use client";

import React, { useState } from "react";
import "../../../app/(auth)/signup/signup.css";
import Link from "next/link";
import fb from "../../../../public/fb.png";
import lk from "../../../../public/lk.png";
import google from "../../../../public/google.png";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const SignupComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="login w-full h-screen  flex items-center justify-center">
      <section
        className="
h-[850px] pb-10 w-[777px] bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-none opacity-80 
"
      >
        <div className="p-5">
          <Link href={".."} className=" text-blue-500">
            Go Back
          </Link>
        </div>

        <div className=" text-center">
          <h4 className="font-semibold text-xl">Sign Up!</h4>
          <h5 className=" text-xl">Register to hit your dream job!</h5>
        </div>

        <form
          action=""
          className="   text-center  mt-10 w-full lg:w-[465px] mx-auto px-5"
        >
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full lg:w-[465px] max-w-full mt-5"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full lg:w-[465px] max-w-full mt-5"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full lg:w-[465px] max-w-full mt-5"
            />
          </div>

          <div className=" mt-5 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full lg:w-[465px] max-w-full"
            />

            {!showPassword ? (
              <button className=" absolute top-4 right-2" type="button">
                <FaEye size={20} onClick={handleShowPassword} />
              </button>
            ) : (
              <button className=" absolute top-4 right-2" type="button">
                <FaEyeSlash size={20} onClick={handleShowPassword} />
              </button>
            )}
          </div>

          <div className=" mt-5 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input input-bordered w-full lg:w-[465px] max-w-full"
            />

            {!showPassword ? (
              <button className=" absolute top-4 right-2" type="button">
                <FaEye size={20} onClick={handleShowPassword} />
              </button>
            ) : (
              <button className=" absolute top-4 right-2" type="button">
                <FaEyeSlash size={20} onClick={handleShowPassword} />
              </button>
            )}
          </div>

          <section className=" flex justify-between items-center mt-4">
            <div className="">
              <label className="label cursor-pointer gap-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary h-5 w-5"
                  required
                />
                <span className="label-text">Remember me</span>
              </label>
            </div>
            <div>
              <Link href={"/forgotPassword"} className="text-blue-400">
                Forgot Password?
              </Link>
            </div>
          </section>

          <div>
            <button className=" bg-[#0DCAF0] w-full py-4 text-white text-xl mt-10 rounded-2xl">
              Sign Up
            </button>
          </div>
        </form>

        <p className=" text-center mt-6 font-semibold">Or continue with</p>

        <div className=" flex items-center justify-center gap-3 mt-3">
          <button>
            <Image
              src={fb}
              alt="login-facebook"
              className=" w-[31px] h-[31px] object-cover"
            />
          </button>
          <button>
            <Image
              src={google}
              alt="login-google"
              className=" w-[31px] h-[31px] object-cover"
            />
          </button>

          <button>
            <Image
              src={lk}
              alt="login-linkedIn"
              className=" w-[31px] h-[31px] object-cover"
            />
          </button>
        </div>

        <div>
          <p className=" text-center mt-6 font-semibold">
            Already have an account?{" "}
            <span className=" font-light text-blue-400">
              <Link href={"/login"}>Log In</Link>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignupComponent;
