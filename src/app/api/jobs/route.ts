import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";

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

    console.log("Company image:", companyImage); // Log the companyImage

    const db = await connect();

    const q =
      "INSERT INTO jobs (positions, companyName, companyImage, jobType, country, salary, experience, description, responsibilities, skills, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      positions,
      companyName,
      companyImage,
      jobType,
      country,
      salary,
      experience,
      description,
      JSON.stringify(responsibilities),
      JSON.stringify(skills),
      user_id,
    ];

    const [result] = await db.query(q, values);
    await db.end();

    console.log(result);

    return NextResponse.json(
      { msg: "Job posting successful", result },
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
    // for search query
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const jobType = searchParams.get("jobType");
    const companyName = searchParams.get("companyName");
    const position = searchParams.get("position");
    const country = searchParams.get("country");
    // for search query

    const db = await connect();

    let q = `
      SELECT jobs.*
      FROM jobs
      WHERE 1=1
    `;

    if (jobType) {
      q += ` AND jobType LIKE '%${jobType}%'`;
    }
    if (companyName) {
      q += ` AND companyName LIKE '%${companyName}%'`;
    }
    if (position) {
      q += ` AND positions LIKE '%${position}%'`;
    }
    if (country) {
      q += ` AND country LIKE '%${country}%'`;
    }

    const [rows] = await db.query(q);
    await db.end();

    return NextResponse.json(rows, { status: 200 });
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
