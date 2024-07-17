import React from "react";

export const JobSkeleton = ({ num }: { num: number }) => {
  let l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <main className=" flex justify-center gap-5 items-center flex-col mx-auto">
      {l.map((i, index) => {
        return (
          <div className="skeleton md:h-[110px] w-10/12" key={index}></div>
        );
      })}
    </main>
  );
};
