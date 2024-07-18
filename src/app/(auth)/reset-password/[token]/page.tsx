"use client";

import React, { useEffect, useState } from "react";
import "../../login/login.css";
import Link from "next/link";
import fb from "../../../../public/fb.png";
import lk from "../../../../public/lk.png";
import google from "../../../../public/google.png";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store/hooks";
import { forgottenPassword, resetPassword } from "@/redux/app/authSlice";
import axios from "axios";

type Inputs = {
  email: string;
  password: string;
};

const ResetPassword = ({ params }: { params: { token: string } }) => {
  const { token } = params;

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword: SubmitHandler<Inputs> = async (form) => {
    try {
      const formData = {
        token,
        password: form.password,
      };

      dispatch(resetPassword(formData));

      reset();
      router.push("/login");
    } catch (error) {
      console.error("Sign-in error", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <main className="login w-full h-screen flex items-center justify-center">
      <section className="pb-5 w-[777px] bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-none opacity-80">
        <div className="p-5">
          <Link href="/login" className="text-blue-500">
            Go Back
          </Link>
        </div>

        <div className="text-center">
          <h4 className="font-semibold text-xl">Reset Password</h4>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="text-center mt-10 w-full lg:w-[465px] mx-auto px-5"
        >
          <div className=" mt-5 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full lg:w-[465px] max-w-full"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className=" text-start text-sm text-red-700">
                Password is Required
              </p>
            )}

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

          <div>
            <button className="bg-[#0DCAF0] w-full py-2 text-white text-xl mt-4 rounded-2xl">
              Reset Password
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ResetPassword;
