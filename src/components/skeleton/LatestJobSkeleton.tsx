import React from "react";

export const LatestJobSkeleton = ({ num }: { num: number }) => {
  let l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <main className=" flex justify-center gap-3">
      {l.map((i, index) => {
        return <div className="skeleton h-[250px] w-[300px]" key={index}></div>;
      })}
    </main>
  );
};
