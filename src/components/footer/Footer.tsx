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
import { useSession } from "next-auth/react";

export const Footer = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/signup/jobSeeker" ||
    pathname === "/signup/employer" ||
    pathname === "/forgotten-password" ||
    pathname.includes("/reset-password")
  ) {
    return null;
  }

  return (
    <main className="mb-1 mx-5">
      <div className=" bg-gray-500 h-0.5 w-full max-w-full" />

      <section className="w-10/12 my-4 mx-auto lg:flex items-center justify-between">
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
                <a
                  href="https://linkedin.com/in/benjamin-benjamin

"
                >
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
                <a href=" https://instagram.com/benjamin_c.dev?igshid=MzMyNGUyNmU2YQ==">
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
                <a href="https://twitter.com/BenjaminChide14">
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
              <Link
                href={`${
                  session?.user.role === "employer"
                    ? "/employer/post-jobs"
                    : "/jobs"
                }`}
              >
                Post a Jobs
              </Link>
            </li>
            <li className=" list-disc">
              <Link href={"/contact"}>Contact Us</Link>
            </li>
            {!session && (
              <li className=" list-disc">
                <Link href={"/login"}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </section>

      <div className=" bg-gray-500 h-0.5 w-full max-w-full" />
    </main>
  );
};

export default Footer;
