import React from "react";
import insta from "../../../../public/insta.png";
import map from "../../../../public/map.png";
import Image from "next/image";
import { CiClock2, CiUser } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { GoBriefcase } from "react-icons/go";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RelatedJobs } from "@/components/JobListlings/relatedJobs/RelatedJobs";

const JobDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <main>
      <section className="lg:flex justify-center items-center gap-14 mb-10 w-11/12 mx-auto">
        <section>
          <div className=" bg-[#DBF7FD] p-7 rounded-xl w-[500px] max-w-full">
            <Image
              src={insta}
              alt="company-logo"
              className="w-10 h-10 shadow-lg"
            />
            <h2 className=" font-semibold text-2xl mt-3">Digital Marketer</h2>
            <p className=" max-w-md my-3">
              Lorem ipsum dolor sit amet consectetur. Et ultrices tellus
              convallis quam. Sed opi commodo proin gravida magnis pretium
              senectus aliquet.
            </p>

            <p className=" mt-10 font-semibold text-xl">Job Information:</p>

            <section className=" bg-white shadow-xl p-5 w-fit mt-3 rounded-xl border-2 flex flex-col gap-2">
              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <CiUser size={20} />
                </span>{" "}
                Employment Type:{" "}
                <span className="text-blue-300 font-medium"> Full Time</span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <IoLocationOutline size={20} />
                </span>{" "}
                Location:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  United Kingdom
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <CiClock2 size={20} />
                </span>{" "}
                Date Posted:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  13th April, 2024.
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <GoBriefcase size={20} />
                </span>{" "}
                Experience:{" "}
                <span className="text-blue-300 font-medium"> 3+ Years</span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <BsCurrencyDollar size={20} />
                </span>{" "}
                Salary:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  30k - 35k per annum
                </span>
              </p>
            </section>
          </div>

          <div className=" mt-4">
            <Image
              src={map}
              alt="map"
              className=" w-[500px] max-w-full h-[400px] object-cover rounded-xl"
            />
          </div>
        </section>
        <section className="mx-5 lg:mx-0 mt-7 lg:mt-0">
          <h2 className=" font-semibold text-2xl">Job Description:</h2>
          <p className="max-w-4xl my-5">
            Lorem ipsum dolor sit amet consectetur. Arcu in amet pellentesque
            magna integer turpis. Tortor ut sollicitudin varius vitae lectus ac
            elementum vel. Viverra pellentesque risus tristique mauris metus.
            Imperdiet purus nulla mi consequat nulla.
          </p>
          <p className="max-w-4xl">
            Lorem ipsum dolor sit amet consectetur. Arcu in amet pellentesque
            magna integer turpis. Tortor ut sollicitudin varius vitae lectus ac
            elementum vel. Viverra pellentesque risus tristique mauris metus.
            Imperdiet purus nulla mi consequat nulla.
          </p>

          <section className=" mt-10">
            {/*   Duties & Responsibilities: */}
            <h2 className=" font-semibold text-2xl">
              Duties & Responsibilities:
            </h2>

            <div className=" mt-5">
              <ul className=" space-y-3">
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
              </ul>
            </div>
          </section>

          <section className=" mt-10">
            {/*  Skills & Qualifications: */}
            <h2 className=" font-semibold text-2xl">
              Skills & Qualifications:
            </h2>

            <div className=" mt-5">
              <ul className=" space-y-3">
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className=" flex md:items-center gap-2 font-[500]">
                  <span>
                    <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                  </span>
                  Lorem ipsum dolor sit amet consectetur.
                </li>
              </ul>
            </div>
          </section>

          <div>
            <button className=" text-lg bg-[#0DCAF0] py-2 px-3 text-white rounded-lg mt-8">
              Apply Now
            </button>
          </div>
        </section>
      </section>

      <section className=" mt-24 mb-10">
        <div className=" text-center">
          <h2 className=" font-semibold text-xl">Related Jobs</h2>
          <p className=" font-medium">
            Lorem ipsum dolor sit amet consectetur. Risus tempus eget egestas
            dolor ut. At interdum amet id duis pulvinar quis massa elit. Amet
            quam commodo est pulvinar vitae.
          </p>
        </div>

        <div className=" mt-10">
          <RelatedJobs />
        </div>
      </section>
    </main>
  );
};

export default JobDetails;
