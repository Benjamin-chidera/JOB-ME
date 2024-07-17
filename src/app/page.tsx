"use client";

import { JobSelector } from "@/components/Home/jobSelector/JobSelector";
import "./../components/Home/hero.css";
import vector from "../../public/Vector.png";
import people from "../../public/people.png";
import work from "../../public/work.png";
import skillman from "../../public/skillman.png";
import Image from "next/image";
import Link from "next/link";
import { LatestJobs } from "@/components/Home/LatestJobs/LatestJobs";
import { Testimonials } from "@/components/Home/testimonials/Testimonials";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";

export default function Home() {
  // const { allJobs } = useAppSelector((state) => state.jobs);
  const [jobType, setJobType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  const fetchJobs = async (filters = {}) => {
    try {
      const { data } = await axios.get("/api/jobs", {
        params: filters,
      });
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    const filters = { jobType, companyName, position, country };
    fetchJobs(filters);

    if (pathname === "/") {
      router.push("/jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // console.log(allJobs);

  return (
    <main className=" pb-10 ">
      <div className="hero">
        {/* hero img */}
        <p className=" text-white text-2xl  max-w-sm mx-auto text-center mb-20">
          FIND JOBS AND HIRE AMAZING TALENTS!
        </p>

        <div className=" mx-auto w-10/12">
          <JobSelector
            jobType={jobType}
            setJobType={setJobType}
            companyName={companyName}
            setCompanyName={setCompanyName}
            position={position}
            setPosition={setPosition}
            country={country}
            setCountry={setCountry}
            handleSearch={handleSearch}
          />
        </div>
      </div>

      <section className="  bg-[#F5F3F3]">
        <div className=" py-10  w-10/12 mx-auto">
          <div className="md:flex items-center justify-center gap-32">
            <div className="relative flex justify-center">
              <Image
                src={vector}
                alt="Vector"
                className="w-[255px] lg:w-[450px]"
              />
              <Image
                src={people}
                alt="Vector"
                className="w-[250px] lg:w-[450px] absolute -bottom-4"
              />
            </div>

            <div className="mt-5 lg:mt-0 ">
              <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl max-w-[450px] ">
                Find Millions of Job Opportunities Right for You!
              </h2>

              <p className="max-w-[470px] mb-6">
                Lorem ipsum dolor sit amet consectetur. Duis sed ornare
                adipiscing sed platea integer habitant. Eros quis hac amet
                dignissim morbi vulputate eriva it commodo mi. Est mauris diam
                donec magna. Sit cras fringilla integer sed praesent urna amet.
                Donec suspendisse quis sed placerat lacus eupiii pretium duis
                semper est ac nec ultricie.
              </p>

              <Link
                href={"/jobs"}
                className="font-semibold text-lg bg-[#0DCAF0] py-3 px-5 text-white rounded-lg"
              >
                Discover More
              </Link>
            </div>
          </div>

          <div className="md:flex items-center justify-center gap-32 mt-10">
            <div className="mt-5 lg:mt-0">
              <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl max-w-[450px]">
                Find Millions of Job Opportunities Right for You!
              </h2>

              <p className="max-w-[470px] mb-6">
                Lorem ipsum dolor sit amet consectetur. Duis sed ornare
                adipiscing sed platea integer habitant. Eros quis hac amet
                dignissim morbi vulputate eriva it commodo mi. Est mauris diam
                donec magna. Sit cras fringilla integer sed praesent urna amet.
                Donec suspendisse quis sed placerat lacus eupiii pretium duis
                semper est ac nec ultricie.
              </p>

              <Link
                href={"/jobs"}
                className="font-semibold text-lg bg-[#0DCAF0] py-3 px-5 text-white rounded-lg"
              >
                Discover More
              </Link>
            </div>

            <div className="relative mt-8 flex justify-center">
              <Image
                src={vector}
                alt="Vector"
                className="w-[255px] lg:w-[450px]"
              />
              <Image
                src={people}
                alt="Vector"
                className="w-[250px] lg:w-[450px] absolute -bottom-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS? */}

      <section className="py-14">
        <Image
          src={work}
          alt="Vector"
          className=" w-10/12 mx-auto lg:w-[1020px]"
        />
      </section>

      {/* Latest Job Listings */}
      <LatestJobs />

      {/* skill set */}

      <section className="  skills lg:h-[400px] py-10 lg:py-0 mx-auto px-10 md:px-20 ">
        <div className="flex justify-center items-center w-11/12  mx-auto">
          <div>
            <h2 className="font-semibold text-xl md:max-w-[300px]">
              Get Jobs that match your Qualifications and Skill Set
            </h2>
            <p className=" md:max-w-[500px] my-7">
              Lorem ipsum dolor sit amet consectetur. Dolor euismod mattis nulla
              aliquam a. In ac in ornare donec consectetur. Nam semper gravida
              enim dolor velit aliquam ut ac.{" "}
            </p>

            <button
              className="font-semibold text-lg bg-[#0DCAF0] py-3 px-5 text-white rounded-lg"
              onClick={() => router.push("/jobs")}
            >
              Upload Your CV
            </button>
          </div>
          <div className="">
            <Image
              src={skillman}
              alt="skills man"
              className="h-[400px] object-cover hidden lg:block w-[455px]"
            />
          </div>
        </div>
      </section>

      {/* testimonials */}
      <Testimonials />
    </main>
  );
}
