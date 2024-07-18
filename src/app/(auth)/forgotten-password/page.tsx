"use client";

import React, { useState } from "react";
import "../login/login.css";
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
import { forgottenPassword } from "@/redux/app/authSlice";

type Inputs = {
  email: string;
  password: string;
};

const ForgottenPassword = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();

  const handleForgottenPassword: SubmitHandler<Inputs> = async (formData) => {
    try {
      dispatch(forgottenPassword(formData));

      reset();
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
          <h4 className="font-semibold text-xl">Forgotten Password</h4>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <form
          onSubmit={handleSubmit(handleForgottenPassword)}
          className="text-center mt-10 w-full lg:w-[465px] mx-auto px-5"
        >
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full lg:w-[465px] max-w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <button className="bg-[#0DCAF0] w-full py-2 text-white text-xl mt-4 rounded-2xl">
              Forgotten Password
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ForgottenPassword;
