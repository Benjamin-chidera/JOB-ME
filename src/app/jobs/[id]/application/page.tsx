"use client";

import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { applyJobs } from "@/redux/app/jobSlice";

type applyJobType = {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  coverletter: string;
};

const JobApplication = ({ params }: { params: { id: string } }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<applyJobType>();

  const { id } = params;
  console.log("job id", id);

  const dispatch = useDispatch();
  const { data: session } = useSession();
  console.log(session?.user);

  const [companyImageUrl, setCompanyImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (session?.user?.id) {
        // Check local storage first
        const localStorageKey = `application_${session.user.id}_${id}`;
        const localStorageStatus = localStorage.getItem(localStorageKey);

        if (localStorageStatus) {
          setHasApplied(JSON.parse(localStorageStatus));
        } else {
          try {
            const response = await fetch(
              `/api/applications?userId=${session.user.id}&jobId=${id}`
            );
            const data = await response.json();
            setHasApplied(data.applied);
            // Save to local storage
            localStorage.setItem(localStorageKey, JSON.stringify(data.applied));
          } catch (error) {
            console.error("Failed to check application status:", error);
          }
        }
      }
    };

    checkApplicationStatus();
  }, [session?.user?.id, id]);

  const handlePostJob: SubmitHandler<applyJobType> = async (data) => {
    if (!companyImageUrl) {
      setError("Please upload a company image.");
      return;
    }

    if (session?.user?.id && !hasApplied) {
      const form = {
        ...data,
        resume: companyImageUrl,
        userId: session?.user?.id,
        jobId: id,
      };
      try {
        await dispatch(applyJobs(form));
        reset();
        setHasApplied(true);
        // Update local storage
        const localStorageKey = `application_${session.user.id}_${id}`;
        localStorage.setItem(localStorageKey, JSON.stringify(true));
        setError("")
      } catch (error) {
        console.error("Failed to apply for job:", error);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <main className=" lg:w-11/12 mx-auto mb-14">
      <section className="bg-[#DBF7FD] lg:w-[50%] mx-auto lg:p-7 lg:px-10 p-2">
        <form onSubmit={handleSubmit(handlePostJob)}>
          <section className=" flex items-center justify-between gap-7">
            <div className="w-full">
              <label className="form-control w-full max-w-full">
                <div className="label">
                  <span className="label-text">First Name*</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-full"
                  {...register("firstname", { required: true })}
                />
              </label>

              {errors.firstname && (
                <p className="text-start text-sm text-red-700">
                  Firstname is Required
                </p>
              )}
            </div>

            <div className=" w-full">
              <label className="form-control w-full max-w-full">
                <div className="label">
                  <span className="label-text">Last Name*</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-full"
                  {...register("lastname", { required: true })}
                />
              </label>

              {errors.lastname && (
                <p className="text-start text-sm text-red-700">
                  Lastname is Required
                </p>
              )}
            </div>
          </section>

          <section className=" flex items-center justify-between gap-7 mt-5">
            <div className=" w-full">
              <label className="form-control w-full max-w-full">
                <div className="label">
                  <span className="label-text">Email Address*</span>
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full max-w-full"
                  {...register("email", { required: true })}
                />
              </label>

              {errors.email && (
                <p className="text-start text-sm text-red-700">
                  Email Address is Required
                </p>
              )}
            </div>

            <div className=" w-full">
              <label className="form-control w-full max-w-full">
                <div className="label">
                  <span className="label-text">Phone Number*</span>
                </div>
                <input
                  type="tel"
                  className="input input-bordered w-full max-w-full"
                  {...register("phonenumber", { required: true })}
                />
              </label>

              {errors.phonenumber && (
                <p className="text-start text-sm text-red-700">
                  Phone Number is Required
                </p>
              )}
            </div>
          </section>

          <section className=" mt-5">
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Cover Letter*</span>
              </div>
              <textarea
                className="textarea textarea-bordered resize-none h-48"
                {...register("coverletter", { required: true })}
              ></textarea>
            </label>
            {errors.coverletter && (
              <p className="text-start text-sm text-red-700">
                Cover Letter is Required
              </p>
            )}
          </section>

          <section className=" mt-5">
            <label className="form-control w-full max-w-full">
              <div className=" w-full">
                <label className="form-control w-full max-w-full">
                  <div className="label">
                    <span className="label-text">Resume*</span>
                  </div>
                  <CldUploadWidget
                    uploadPreset="JOBME-jobs"
                    options={{ sources: ["local"] }}
                    onUpload={(result) => {
                      setCompanyImageUrl(result?.info?.secure_url);
                    }}
                  >
                    {({ open }) => {
                      return (
                        <button
                          onClick={() => open()}
                          className="file-input file-input-bordered w-full max-w-lg text-start ps-5"
                          type="button"
                        >
                          Upload your resume
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                  <div className=" mt-1">
                    <span className=" text-sm font-semibold">
                      File type should not be larger than 12MB. Supported file
                      types: pdf.{" "}
                    </span>
                  </div>
                </label>
                {error && (
                  <p className=" text-start text-sm text-green-700">{error}</p>
                )}
                {companyImageUrl && (
                  <p className=" text-start text-sm text-green-700">
                    Image uploaded successfully
                  </p>
                )}
              </div>

              <div className="w-fit">
                <label className="label cursor-pointer gap-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-primary h-5 w-5"
                    required
                  />
                  <span className="label-text">
                    I agree to the{" "}
                    <span className=" text-blue-400">Terms & Conditions</span>
                  </span>
                </label>
              </div>
            </label>
          </section>

          <button
            className={`text-[16px] py-2 px-3 text-white rounded-lg ${
              hasApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0DCAF0] mt-3"
            }`}
            disabled={hasApplied}
          >
            {hasApplied ? "Applied" : "Apply Now"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default JobApplication;
