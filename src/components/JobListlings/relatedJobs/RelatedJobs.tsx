import React from "react";
import fb from "../../../../public/fb.png";
import lk from "../../../../public/lk.png";
import insta from "../../../../public/insta.png";
import x from "../../../public/x.png";
import Image from "next/image";
import { CiClock2 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { format, TDate } from "timeago.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormatCurrency } from "@/libs/FormatCurrency";
import { StaticImport } from "next/dist/shared/lib/get-img-props";


export const RelatedJobs = ({ sliceRelatedJobs }: any) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <main className=" w-11/12 mx-auto">
      <section className=" mt-10 flex justify-center items-center flex-wrap mx-auto gap-10">
        {sliceRelatedJobs?.map((job: { id: React.Key | null | undefined; positions: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; created_at: TDate; jobType: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; salary: string | number; companyImage: string | StaticImport; companyName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; country: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
          <div key={job.id} className="w-[300px] border rounded-xl text-start">
            <div className="p-5">
              <h2 className=" font-semibold text-xl">{job.positions}</h2>

              <p className=" text-gray-400 mt-2 flex items-center gap-1">
                <span>
                  <CiClock2 size={24} />
                </span>{" "}
                Posted {format(job.created_at)}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[#0DCAF0] capitalize text-sm mode w-fit px-3 p-2">
                  {job.jobType}
                </p>
                <p className=" font-semibold">
                  {FormatCurrency(job.salary, "USD")}
                </p>
              </div>
            </div>
            <hr />

            <div className="p-5 ">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={job.companyImage}
                  alt="company-logo"
                  width={40}
                  height={40}
                  className=" shadow-xl p-1 rounded-xl"
                />
                <div>
                  <p className=" font-semibold">{job.companyName}</p>
                  <p className=" flex items-center gap-1 text-gray-400">
                    <span>
                      <IoLocationOutline size={24} />
                    </span>{" "}
                    {job.country}
                  </p>
                </div>
              </div>

              {session?.user?.role !== "employer" && (
                <button
                  className="font-medium bg-[#0DCAF0] py-1 px-3 text-[14px] text-white rounded-lg"
                  onClick={() => router.push(`/jobs/${job.id}/application`)}
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
