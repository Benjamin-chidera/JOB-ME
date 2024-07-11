"use client";

import React, { useState } from "react";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postJobs } from "@/redux/app/jobSlice";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/store/hooks";


type postJobType = {
  positions: string;
  companyName: string;
  companyImage: string;
  jobType: string;
  country: string;
  salary: number;
  experience: number;
  description: string;
  responsibilities: string[];
  skills: string[];
};

const PostJobs = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<postJobType>();

  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  // console.log(session?.user?.id);
  

  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [skills, setSkills] = useState<string[]>([""]);
  const [companyImageUrl, setCompanyImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  const handleRemoveResponsibility = (index: number) => {
    const newResponsibilities = responsibilities.filter((_, i) => i !== index);
    setResponsibilities(newResponsibilities);
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handlePostJob: SubmitHandler<postJobType> = (data) => {
    if (!companyImageUrl) {
      setError("Please upload a company image.");
      return;
    }

    const form = {
      ...data,
      responsibilities,
      skills,
      companyImage: companyImageUrl,
      user_id: session?.user?.id,
    };

    dispatch(postJobs(form));

    reset();
    setResponsibilities([""]);
    setSkills([""]);
  };

  return (
    <main className="w-11/12 mx-auto mb-10">
      <form
        onSubmit={handleSubmit(handlePostJob)}
        className="bg-[#DBF7FD] w-fit p-5 flex flex-col gap-3 rounded-lg max-w-full mx-auto"
      >
        <section className="flex items-center justify-between gap-5">
          <div>
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Position</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-full"
                {...register("positions", { required: true })}
              />
            </label>
            {errors.positions && (
              <p className="text-start text-sm text-red-700">
                Position is Required
              </p>
            )}
          </div>

          <div>
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Name of company</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-full"
                {...register("companyName", { required: true })}
              />
            </label>
            {errors.companyName && (
              <p className="text-start text-sm text-red-700">
                Company Name is Required
              </p>
            )}
          </div>
        </section>

        <section className="md:flex items-center justify-between gap-5">
          <div className=" w-full">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Company Image</span>
              </div>
              <CldUploadWidget
                uploadPreset="JOBME-jobs"
                options={{ sources: ["local"] }}
                onUpload={(result: CloudinaryUploadWidgetResults) => {
                  if (result.info && typeof result.info !== "string") {
                    setCompanyImageUrl(result.info.secure_url);
                  }
                }}
              >
                {({ open }) => {
                  return (
                    <button
                      onClick={() => open()}
                      className=" border w-full py-3  ps-3 bg-white rounded-lg text-sm text-start"
                      type="button"
                    >
                      Upload an Image
                    </button>
                  );
                }}
              </CldUploadWidget>
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

          <div className="w-full">
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Job Type</span>
              </div>
              <select
                className="select select-bordered w-full max-w-full"
                {...register("jobType", { required: true })}
              >
                <option disabled selected>
                  Mode of work
                </option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Remote</option>
                <option>Internship</option>
              </select>
            </label>
            {errors.jobType && (
              <p className="text-start text-sm text-red-700">
                Job Type is Required
              </p>
            )}
          </div>
        </section>

        <section className="flex items-center justify-between gap-5">
          <div>
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Country</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-full"
                {...register("country", { required: true })}
              />
            </label>
            {errors.country && (
              <p className="text-start text-sm text-red-700">
                Country is Required
              </p>
            )}
          </div>

          <div>
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Salary</span>
              </div>
              <input
                type="number"
                className="input input-bordered w-full max-w-full"
                {...register("salary", { required: true })}
              />
            </label>
            {errors.salary && (
              <p className="text-start text-sm text-red-700">
                Salary is Required
              </p>
            )}
          </div>
        </section>

        <section>
          <div>
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Experience</span>
              </div>
              <select
                className="select select-bordered w-full max-w-full"
                {...register("experience", { required: true })}
              >
                <option disabled selected>
                  Years of work
                </option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>10+</option>
              </select>
            </label>
            {errors.experience && (
              <p className="text-start text-sm text-red-700">
                Experience is Required
              </p>
            )}
          </div>
        </section>

        <section>
          <label className="form-control w-full max-w-full">
            <div className="label">
              <span className="label-text">Job Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered resize-none h-48"
              {...register("description", { required: true })}
            ></textarea>
          </label>
          {errors.description && (
            <p className="text-start text-sm text-red-700">
              Description is Required
            </p>
          )}
        </section>

        <section>
          <div>
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Responsibilities</span>
              </div>
              {responsibilities?.map((responsibility, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={responsibility}
                    onChange={(e) =>
                      handleResponsibilityChange(index, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveResponsibility(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddResponsibility}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add Responsibility
              </button>
            </label>
            {errors.responsibilities && (
              <p className="text-start text-sm text-red-700">
                Responsibilities are Required
              </p>
            )}
          </div>
        </section>

        <section>
          <div>
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Skills</span>
              </div>
              {skills?.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSkill}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add Skill
              </button>
            </label>
            {errors.skills && (
              <p className="text-start text-sm text-red-700">
                Skills are Required
              </p>
            )}
          </div>
        </section>

        <button
          type="submit"
          className="btn bg-[#11366B] text-white hover:bg-blue-900 mt-5"
        >
          Post Job
        </button>
      </form>
    </main>
  );
};

export default PostJobs;
