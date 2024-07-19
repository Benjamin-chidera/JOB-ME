"use client";

import React, { useState } from "react";
import "./login.css";
import Link from "next/link";
import fb from "../../../../public/fb.png";
import lk from "../../../../public/lk.png";
import google from "../../../../public/google.png";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { status, data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitSignIn: SubmitHandler<Inputs> = async (formData) => {
    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("Invalid credentials");
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Sign-in error", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  console.log(status);

  return (
    <main className="login w-full h-screen flex items-center justify-center">
      <section className="h-fitw-[777px] pb-20 bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-none opacity-80">
        <div className="p-5">
          <Link href=".." className="text-blue-500">
            Go Back
          </Link>
        </div>

        <div className="text-center">
          <h4 className="font-semibold text-xl">Welcome back!</h4>
          <h5 className="text-xl">Log In to hit your dream job!</h5>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <form
          onSubmit={handleSubmit(onSubmitSignIn)}
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
          <div className="mt-10 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full lg:w-[465px] max-w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <button
              className="absolute top-4 right-2"
              type="button"
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <section className="flex justify-between items-center mt-4">
            <div>
              <label className="label cursor-pointer gap-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary h-5 w-5"
                />
                <span className="label-text">Remember me</span>
              </label>
            </div>
            <div>
              <Link href="/forgotten-password" className="text-blue-400">
                Forgot Password?
              </Link>
            </div>
          </section>

          <div>
            <button className="bg-[#0DCAF0] w-full py-4 text-white text-xl mt-10 rounded-2xl">
              {status === "loading" ? "Logging..." : "Log In"}
            </button>
          </div>
        </form>

        {/* <p className="text-center mt-6 font-semibold">Or continue with</p> */}

        {/* <div className="flex items-center justify-center gap-3 mt-3">
          <button>
            <Image
              src={fb}
              alt="login-facebook"
              className="w-[31px] h-[31px] object-cover"
            />
          </button>
          <button onClick={handleGoogleSignIn}>
            <Image
              src={google}
              alt="login-google"
              className="w-[31px] h-[31px] object-cover"
            />
          </button>
          <button>
            <Image
              src={lk}
              alt="login-linkedIn"
              className="w-[31px] h-[31px] object-cover"
            />
          </button>
        </div> */}

        <div>
          <p className="text-center mt-6 font-semibold">
            Don&apos;t have an account?{" "}
            <span className="font-light text-blue-400">
              <Link href="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
