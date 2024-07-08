"use client";

import React, { useState } from "react";
import "./login.css";
import Link from "next/link";
import fb from "../../../../public/fb.png";
import lk from "../../../../public/lk.png";
import google from "../../../../public/google.png";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="login w-full h-screen  flex items-center justify-center">
      <section
        className="
h-[623px] w-[777px] bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-none opacity-80 
"
      >
        <div className="p-5">
          <Link href={".."} className=" text-blue-500">
            Go Back
          </Link>
        </div>

        <div className=" text-center">
          <h4 className="font-semibold text-xl">Welcome back!</h4>
          <h5 className=" text-xl">Log In to hit your dream job!</h5>
        </div>

        <form
          action=""
          className="   text-center  mt-10 w-full lg:w-[465px] mx-auto px-5"
        >
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full lg:w-[465px] max-w-full"
            />
          </div>
          <div className=" mt-10 relative">
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
              Log In
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
            {"Don't"} have an account?{" "}
            <span className=" font-light text-blue-400">
              <Link href={"/signup"}>Sign Up</Link>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
