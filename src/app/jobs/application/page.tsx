import React from "react";

const JobApplication = () => {
  return (
    <main className=" lg:w-11/12 mx-auto mb-14">
      <section className="bg-[#DBF7FD] lg:w-[50%] mx-auto lg:p-7 lg:px-10 p-2">
        <form action="">
          <section className=" flex items-center justify-between gap-7">
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">First Name*</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-full"
              />
            </label>

            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Last Name*</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-full"
              />
            </label>
          </section>

          <section className=" flex items-center justify-between gap-7 mt-5">
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Email Address*</span>
              </div>
              <input
                type="email"
                className="input input-bordered w-full max-w-full"
              />
            </label>

            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Phone Number*</span>
              </div>
              <input
                type="tel"
                className="input input-bordered w-full max-w-full"
              />
            </label>
          </section>

          <section className=" mt-5">
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Cover Letter*</span>
              </div>
              <textarea className="textarea textarea-bordered resize-none h-48"></textarea>
            </label>
          </section>

          <section className=" mt-5">
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text">Cover Letter*</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-lg"
              />

              <div className=" mt-1">
                <span className=" text-sm font-semibold">
                  File type should not be larger than 12MB. Supported file
                  types: doc. docx. pdf.{" "}
                </span>
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

          <button className=" mt-5 bg-[#0DCAF0] text-white px-4 py-2.5 rounded-xl">Apply Now</button>
        </form>
      </section>
    </main>
  );
};

export default JobApplication;
