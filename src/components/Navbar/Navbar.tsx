"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../../../public/JOBME.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Hamburger from "hamburger-react";

export const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  if (pathname === "/signup") {
    return null;
  }

  if (pathname === "/signup/jobSeeker") {
    return null;
  }

  if (pathname === "/signup/employer") {
    return null;
  }

  return (
    <main
      className={`w-11/12 mx-auto flex items-center justify-between h-18 lg:h-20 `}
    >
      <div>
        <Image src={logo} width={100} height={100} alt="Company-logo" />
      </div>

      <div className=" hidden lg:block">
        {/* llarge devices */}
        <ul className="flex items-center gap-10">
          <li>
            <Link
              href="/"
              className={` text-lg ${
                pathname === "/" ? "text-[#0DCAF0]" : "text-black"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/jobs"
              className={` text-lg ${
                pathname === "/jobs" || pathname.includes("/jobs")
                  ? "text-[#0DCAF0]"
                  : "text-black"
              }`}
            >
              Job Listings
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={` text-lg ${
                pathname === "/contact" ? "text-[#0DCAF0]" : "text-black"
              }`}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div className=" hidden lg:block">
        {" "}
        <ul className="flex items-center gap-10">
          <li>
            <Link
              href="/"
              className=" text-lg bg-[#0DCAF0] py-3 px-5 text-white rounded-lg"
            >
              Post Job
            </Link>
          </li>
          <li>
            <Link href="/login" className=" text-lg">
              Login
            </Link>
          </li>
        </ul>
        {/* llarge devices */}
      </div>

      <section className=" lg:hidden relative">
        {/* mobile devices navbar */}

        <div className=" z-50">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>

        {isOpen && (
          <section className=" bg-white h-screen w-[300px] md:w-[400px] fixed top-0 right-0 z-40">
            <div className=" flex justify-end items-center px-4  lg:mt-8">
              <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>

            <div className=" lg:hidden px-5">
              {/* mobile devices */}
              <ul className="flex flex-col mt-10 gap-10">
                <li>
                  <Link
                    href="/"
                    className={` text-lg ${
                      pathname === "/" ? "text-blue-500" : "text-black"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobs"
                    className={` text-lg ${
                      pathname === "/jobs" || pathname.includes("/jobs")
                        ? "text-blue-500"
                        : "text-black"
                    }`}
                  >
                    Job Listings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={` text-lg ${
                      pathname === "/contact" ? "text-blue-500" : "text-black"
                    }`}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className=" lg:hidden mt-10">
              {" "}
              <ul className="flex flex-col px-5 gap-10">
                <li>
                  <Link
                    href="/jobs"
                    className=" text-lg bg-[#0DCAF0] py-3 px-5 text-white rounded-lg"
                  >
                    Post Job
                  </Link>
                </li>
                <li>
                  <Link href="/login" className=" text-lg">
                    Login
                  </Link>
                </li>
              </ul>
              {/* llarge devices */}
            </div>
          </section>
        )}
      </section>
    </main>
  );
};
