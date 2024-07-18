"use client";

import { JobSelector } from "@/components/Home/jobSelector/JobSelector";
import "./../components/Home/hero.css";
import vector from "../../public/Vector.png";
import people from "../../public/people.png";
import woman from "../../public/woman.png";
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
import { LatestJobSkeleton } from "@/components/skeleton/LatestJobSkeleton";

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

        <div className=" mx-auto w-11/12 md:w-10/12">
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
        <div className=" py-10 w-11/12 md:w-10/12 mx-auto">
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

              <p className="max-w-[470px] mb-6 mt-3 font-[500]">
                Explore a vast array of job openings designed to match your
                skills and aspirations. Whether you're seeking new challenges,
                career growth, or a change of pace, we have opportunities across
                various industries that align perfectly with your goals. Find
                positions that fit your expertise, experience, and passion, and
                take the next step in your professional journey with confidence.
                Your ideal job is just a search away!
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
                Looking for the World’s Best Talents?
              </h2>

              <p className="max-w-[470px] mb-6 mt-3 font-[500]">
                Discover exceptional individuals who can drive innovation and
                excellence in your organization. Our platform connects you with
                the most skilled and dynamic professionals across various
                industries. From visionary leaders to creative problem-solvers,
                find the talent that will elevate your team and help you achieve
                your strategic goals. Tap into a global network of top-tier
                candidates and find the perfect fit for your company’s needs.
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
                src={woman}
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
          className=" w-11/12 md:w-10/12 mx-auto lg:w-[1020px]"
        />
      </section>

      {/* Latest Job Listings */}
      <LatestJobs />

      {/* skill set */}

      <section className="  skills lg:h-[400px] py-10 lg:py-0 mx-auto px-3 md:px-20 ">
        <div className="flex justify-center items-center w-11/12  mx-auto">
          <div>
            <h2 className="font-semibold text-xl md:max-w-[300px]">
              Get Jobs that match your Qualifications and Skill Set
            </h2>
            <p className=" md:max-w-[500px] my-7">
              Discover job opportunities tailored to your unique qualifications
              and skills. Our platform ensures that you find positions that
              align perfectly with your expertise, experience, and career goals.
              From specialized roles to general opportunities, explore positions
              where your talents will be valued and rewarded. Start your search
              today and connect with employers who are looking for exactly what
              you have to offer.
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
