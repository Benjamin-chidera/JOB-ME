import Jobs from "@/models/jobs";
import { NextRequest, NextResponse } from "next/server";
import { server } from "@/libs/connect";

// POST request to create a new job
export const POST = async (req: NextRequest) => {
  try {
    const {
      positions,
      companyName,
      companyImage,
      jobType,
      country,
      salary,
      experience,
      description,
      responsibilities,
      skills,
      user_id,
    } = await req.json();

    await server();

    const job = await Jobs.create({
      positions,
      companyName,
      companyImage,
      jobType,
      country,
      salary,
      experience,
      description,
      responsibilities: Array.isArray(responsibilities)
        ? responsibilities
        : [responsibilities],
      skills: Array.isArray(skills) ? skills : [skills],
      user_id,
    });

    return NextResponse.json(
      { msg: "Job posting successful", job },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ err: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { err: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
};


export const GET = async (req: NextRequest) => {
  try {
    await server();

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const jobType = searchParams.get("jobType");
    const companyName = searchParams.get("companyName");
    const positions = searchParams.get("positions");
    const country = searchParams.get("country");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "3");

    // Constructing the query object
    const query: any = {};

    if (jobType) {
      query.jobType = { $regex: jobType, $options: "i" };
    }
    if (companyName) {
      query.companyName = { $regex: companyName, $options: "i" };
    }
    if (positions) {
      query.positions = { $regex: positions, $options: "i" };
    }
    if (country) {
      query.country = { $regex: country, $options: "i" };
    }

    const jobs = await Jobs.find(query)
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalJobs = await Jobs.countDocuments(query);
    const totalPages = Math.ceil(totalJobs / limit);

    return NextResponse.json(
      {
        jobs,
        totalJobs,
        totalPages,
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ err: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { err: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
};
