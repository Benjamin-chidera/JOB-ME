import React from "react";

export const JobDetailsSkeletonName = () => {
  return (
    <main>
      <div className="skeleton h-[300px] md:h-[800px] w-[500px] max-w-full"></div>
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
      <div className="skeleton w-[100%] max-w-full h-[300px] mt-2"></div>
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
            className="skeleton w-[300px] max-w-full h-[20px] mt-5"
            key={index}
          ></div>
        );
      })}
    </main>
  );
};
