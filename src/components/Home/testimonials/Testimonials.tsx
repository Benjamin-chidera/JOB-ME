import Image from "next/image";
import React from "react";

const testimonails = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    review:
      "“The service exceeded my expectations. The team was highly professional and attentive, ensuring that all my needs were met with precision. I’m extremely satisfied with the results and would recommend them to anyone seeking top-notch quality.”",
    country: "South Africa",
  },
  {
    id: 2,
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    review:
      "I had a fantastic experience working with this team. Their attention to detail and commitment to excellence truly set them apart. From start to finish, everything was handled efficiently and with great care. I highly recommend their services.",
    country: "United Kingdom",
  },
  {
    id: 3,
    name: "James Doe",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    review:
      "“I had a fantastic experience working with this team. Their attention to detail and commitment to excellence truly set them apart. From start to finish, everything was handled efficiently and with great care. I highly recommend their services.”",
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

      <section className="md:flex gap-7 items-center justify-center mt-7 w-fit mx-auto">
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
