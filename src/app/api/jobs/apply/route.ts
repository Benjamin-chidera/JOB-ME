import Jobs from "@/models/jobs";
import User from "@/models/user";
import Application from "@/models/applications";
import { NextRequest, NextResponse } from "next/server";
import { server } from "@/libs/connect";

export const POST = async (req: NextRequest) => {
  try {
    const {
      userId,
      jobId,
      firstname,
      lastname,
      phonenumber,
      email,
      coverletter,
      resume,
    } = await req.json();

    await server();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const job = await Jobs.findById(jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    const application = await Application.create({
      user: userId,
      job: jobId,
      firstname,
      lastname,
      phonenumber,
      email,
      coverletter,
      resume,
    });

    return NextResponse.json(
      { msg: "Application successful", application },
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

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const jobId = searchParams.get("jobId");

    if (userId && jobId) {
    
      const application = await Application.findOne({
        user: userId,
        job: jobId,
      });
      return NextResponse.json({ applied: !!application }, { status: 200 });
    } else if (userId) {
    
      const applications = await Application.find({ user: userId }).populate(
        "job",
        "positions companyName"
      );
      return NextResponse.json({ applications }, { status: 200 });
    } else if (jobId) {
   
      const applicants = await Application.find({ job: jobId }).populate(
        "user",
        "firstname lastname email"
      );
      return NextResponse.json({ applicants }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Missing userId or jobId" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(
        { err: "Failed to retrieve application data", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          err: "Failed to retrieve application data",
          error: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
};
