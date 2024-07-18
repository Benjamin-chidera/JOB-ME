"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../../../public/JOBME.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Hamburger from "hamburger-react";
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

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

  if (pathname === "/forgotten-password") {
    return null;
  }

  if (pathname.includes("/reset-password")) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main
      className={`w-11/12 md:w-10/12 mx-auto flex items-center justify-between h-18 lg:h-20 `}
    >
      <Link href={"/"}>
        <Image src={logo} width={100} height={100} alt="Company-logo" />
      </Link>

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
          {session?.user?.role !== "employer" && (
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
          )}

          {session?.user?.role === "employer" && (
            <li>
              <Link
                href="/jobs/employer"
                className={` text-lg ${
                  pathname === "/jobs/employer"
                    ? "text-[#0DCAF0]"
                    : "text-black"
                }`}
              >
                Jobs Posted By An Employer
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className=" hidden lg:block">
        {" "}
        <ul className="flex items-center gap-10">
          {session?.user?.role === "employer" && (
            <li>
              <Link
                href="/employer/post-jobs"
                className=" text-lg bg-[#0DCAF0] py-3 px-5 text-white rounded-lg"
              >
                Post Job
              </Link>
            </li>
          )}
          {!session ? (
            <li>
              <Link href="/login" className=" text-lg">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                className=" text-lg bg-[#0DCAF0] py-2 px-3 text-white rounded-lg"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Sign Out
              </button>
            </li>
          )}
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
                <li onClick={handleClose}>
                  <Link
                    href="/"
                    className={` text-lg ${
                      pathname === "/" ? "text-blue-500" : "text-black"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li onClick={handleClose}>
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
                <li onClick={handleClose}>
                  <Link
                    href="/contact"
                    className={` text-lg ${
                      pathname === "/contact" ? "text-blue-500" : "text-black"
                    }`}
                  >
                    Contact Us
                  </Link>
                </li>

                {session?.user?.role === "employer" && (
                  <li onClick={handleClose}>
                    <Link
                      href="/jobs/employer"
                      className={` text-lg ${
                        pathname === "/jobs/employer"
                          ? "text-[#0DCAF0]"
                          : "text-black"
                      }`}
                    >
                      Jobs Posted By An Employer
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className=" lg:hidden mt-10">
              {" "}
              <ul className="flex flex-col px-5 gap-10">
                {session?.user?.role === "employer" && (
                  <li>
                    <Link
                      href="/employer/post-jobs"
                      className=" text-lg bg-[#0DCAF0] py-3 px-5 text-white rounded-lg"
                    >
                      Post Job
                    </Link>
                  </li>
                )}
                {!session ? (
                  <li>
                    <Link href="/login" className=" text-lg">
                      Login
                    </Link>
                  </li>
                ) : (
                  <li>
                    <button
                      className=" text-lg bg-[#0DCAF0] py-2 px-3 text-white rounded-lg"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      Sign Out
                    </button>
                  </li>
                )}
              </ul>
              {/* llarge devices */}
            </div>
          </section>
        )}
      </section>
    </main>
  );
};
