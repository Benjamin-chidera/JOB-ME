"use client";

import React, { useState } from "react";
import "./contact.css";
import contact from "../../../public/contact.png";
import Image from "next/image";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { contactUs } from "@/redux/app/authSlice";
import { ContactModal } from "@/components/modals/ContactModal";
import { useAppDispatch } from "@/redux/store/hooks";

type contactTypes = {
  name: string;
  email: string;
  phonenumber: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<contactTypes>();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitContact: SubmitHandler<contactTypes> = (form) => {
    dispatch(contactUs(form));
    reset();
    setIsModalOpen(true);
  };

  return (
    <main className="relative mb-10">
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div>
        <Image
          src={contact}
          alt="Conact-img"
          className="w-full h-40 object-cover object-top md:h-[250px] "
        />
      </div>
      <div className=" absolute top-[7%] md:top-[10%] left-[20%] lg:left-[43%] text-white text-center ">
        <h3 className=" font-[500] text-2xl">Get In Touch With Us</h3>
        <p>We want to hear from you</p>
      </div>
      <section className="flex items-center justify-center">
        <form
          className="bg-[#DBF7FD] w-fit p-5 flex flex-col gap-3 lg:-mt-10 rounded-lg max-w-full"
          onSubmit={handleSubmit(handleSubmitContact)}
        >
          <div className="flex items-center gap-4">
            <div className=" w-full">
              <input
                type="text"
                placeholder="Name*"
                className="input input-bordered w-full max-w-xs"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className=" text-start text-sm text-red-700">
                  Name is Required
                </p>
              )}
            </div>

            <div className=" w-full">
              <input
                type="email"
                placeholder="Email*"
                className="input input-bordered w-full max-w-xs"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className=" text-start text-sm text-red-700">
                  Email Address is Required
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <input
                type="tel"
                placeholder="Phone number*"
                className="input input-bordered w-full max-w-xs"
                {...register("phonenumber", { required: true })}
              />
              {errors.phonenumber && (
                <p className=" text-start text-sm text-red-700">
                  Phone Number is Required
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Subject*"
                className="input input-bordered w-full max-w-xs"
                {...register("subject", { required: true })}
              />
              {errors.subject && (
                <p className=" text-start text-sm text-red-700">
                  Message subject is Required
                </p>
              )}
            </div>
          </div>

          <div>
            <textarea
              className="textarea w-full h-40 resize-none max-w-full"
              placeholder="Message*"
              {...register("message", { required: true })}
            ></textarea>
            {errors.message && (
              <p className=" text-start text-sm text-red-700">
                Message is Required
              </p>
            )}
          </div>

          <button className="bg-[#0DCAF0] py-2 text-white rounded-lg">
            Send Message
          </button>
        </form>
      </section>

      <section className=" flex flex-wrap items-center justify-center gap-8 lg:gap-18 mt-20">
        <div className=" border-4 text-center h-40 w-56 rounded-xl">
          <div className="my-4">
            <BiPhoneCall
              size={50}
              color="#0DCAF0"
              className="bg-blue-100 mx-auto rounded-full p-2"
            />
          </div>
          <h4 className=" font-semibold">Call Us</h4>
          <p className=" text-sm font-medium">Lorem ipsum dolor sit amet.</p>
          <a href="" className=" text-xs text-blue-300">
            +234 904 840 1533
          </a>
        </div>

        <div className=" border-4 text-center h-40 w-56 rounded-xl">
          <div className="my-4">
            <AiOutlineMail
              size={50}
              color="#0DCAF0"
              className="bg-blue-100 mx-auto rounded-full p-2"
            />
          </div>
          <h4 className=" font-semibold">Email Us</h4>
          <p className=" text-sm font-medium">Lorem ipsum dolor sit amet.</p>
          <a href="mailto" className=" text-xs text-blue-300">
            benjaminchidera72@gmail.com
          </a>
        </div>

        <div className=" border-4 text-center h-40 w-56 rounded-xl">
          <div className="my-4">
            <CiLocationOn
              size={50}
              color="#0DCAF0"
              className="bg-blue-100 mx-auto rounded-full p-2"
            />
          </div>
          <h4 className=" font-semibold">Location</h4>
          <p className=" text-sm font-medium">Lorem ipsum dolor sit amet.</p>
          <a href="mailto" className=" text-xs text-blue-300">
            23 shinghai street Lagos, Nigeria
          </a>
        </div>
      </section>
    </main>
  );
};

export default Contact;
