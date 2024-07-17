import React from "react";

export const JobDetailsSkeletonName = () => {
  return (
    <main>
      <div className="skeleton md:h-[400px] w-[500px]"></div>
    </main>
  );
};

export const JobDetailsSkeletonMap = () => {
  return (
    <main>
      <div className="skeleton w-[500px] max-w-full h-[400px] mt-7"></div>
    </main>
  );
};

export const JobDetailsSkeletonText = () => {
  return (
    <main>
      <div className="skeleton w-[200px] max-w-full h-[15px] mt-2"></div>
    </main>
  );
};

export const JobDetailsSkeletonTextRes = ({ num }: { num: number }) => {
  let l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <main>
      {l.map((i, index) => {
        return (
          <div
            className="skeleton w-[200px] max-w-full h-[15px] mt-2"
            key={index}
          ></div>
        );
      })}
    </main>
  );
};
