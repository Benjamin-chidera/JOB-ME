import Image from "next/image";
import React from "react";

const testimonails = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    review:
      "“Lorem ipsum dolor sit amet consectetur. Etiam elit nisl aliquam tempor purus ac. Vestibulum eu euismod enim elit. Nunc phasellus aliquet eu gravida massa vel.”",
    country: "South Africa",
  },
  {
    id: 2,
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    review:
      "“Lorem ipsum dolor sit amet consectetur. Etiam elit nisl aliquam tempor purus ac. Vestibulum eu euismod enim elit. Nunc phasellus aliquet eu gravida massa vel.”",
    country: "United Kingdom",
  },
  {
    id: 3,
    name: "James Doe",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    review:
      "“Lorem ipsum dolor sit amet consectetur. Etiam elit nisl aliquam tempor purus ac. Vestibulum eu euismod enim elit. Nunc phasellus aliquet eu gravida massa vel.”",
    country: "Nigeria",
  },
];

export const Testimonials = () => {
  return (
    <main className="w-11/12 mx-auto my-20 lg:my-32">
      <h2 className=" text-center text-[#0DCAF0] font-semibold">
        Testimonials
      </h2>

      <h4 className=" text-center text-xl font-semibold">
        Feedbacks from clients
      </h4>

      <section className="md:flex gap-7 items-center justify-center mt-7 ">
        {testimonails.map((t) => (
          <div key={t.id} className="bg-[#F5F3F399] p-4 rounded-xl text-center mt-3 md:mt-0 w-[300px]">
            <Image
              src={t.image}
              alt="reviewer image"
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full mx-auto mb-3"
            />
            <p className="max-w-[350px]">{t.review}</p>

            <div className=" mt-12">
              <p className="text-[#0DCAF0]  font-medium">{t.name}</p>
              <p className="mt-2">{t.country}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
