"use client";

import React from "react";
import logo from "../../../public/JOBME.png";
import fb from "../../../public/fb.png";
import lk from "../../../public/lk.png";
import insta from "../../../public/insta.png";
import x from "../../../public/x.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
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
    <main className="mb-7 mx-5">
      <div className=" bg-gray-500 h-0.5 w-full max-w-full" />

      <section className="w-11/12 my-10 mx-auto lg:flex items-center justify-between">
        <div>
          <Image src={logo} width={100} height={100} alt="Company-logo" />

          <div className="mt-8 flex items-center gap-2">
            <span>Find Us On: </span>{" "}
            <ul className="flex items-center gap-3">
              <li>
                <a href="">
                  <Image
                    src={fb}
                    width={50}
                    height={50}
                    alt="Company-socials"
                    className="w-7 h-7"
                  />
                </a>
              </li>
              <li>
                <a href="">
                  <Image
                    src={lk}
                    width={50}
                    height={50}
                    alt="Company-socials"
                    className="w-7 h-7"
                  />
                </a>
              </li>
              <li>
                <a href="">
                  <Image
                    src={insta}
                    width={50}
                    height={50}
                    alt="Company-socials"
                    className="w-7 h-7"
                  />
                </a>
              </li>
              <li>
                <a href="">
                  <Image
                    src={x}
                    width={50}
                    height={50}
                    alt="Company-socials"
                    className="w-7 h-7"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 lg:mt-0">
          <ul className="flex items-center gap-10 lg:gap-20 flex-wrap">
            <li className=" list-disc">
              <Link href={"/jobs"}>Find Jobs</Link>
            </li>
            <li className=" list-disc">
              <Link href={"/jobs"}>Post a Jobs</Link>
            </li>
            <li className=" list-disc">
              <Link href={"/jobs"}>Contact Us</Link>
            </li>
            <li className=" list-disc">
              <Link href={"/jobs"}>Login</Link>
            </li>
          </ul>
        </div>
      </section>

      <div className=" bg-gray-500 h-0.5 w-full max-w-full" />
    </main>
  );
};
