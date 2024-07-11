import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  // apply for a job
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
    const db = await connect();

    // Check if the user has already applied
    // const checkQuery =
    //   "SELECT * FROM applications WHERE user_id = ? AND job_id = ?";
    // const [existingApplications] = await db.query(checkQuery, [userId, jobId]);

    // if (existingApplications.length > 0) {
    //   return NextResponse.json(
    //     { msg: "You have already applied for this job" },
    //     { status: 400 }
    //   );
    // }

    // If not applied, insert the new application
    const insertQuery =
      "INSERT INTO applications (user_id, job_id, firstname, lastname, phonenumber, email, coverletter, resume) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(insertQuery, [
      userId,
      jobId,
      firstname,
      lastname,
      phonenumber,
      email,
      coverletter,
      resume,
    ]);

    return NextResponse.json(
      { msg: "Application successful", result },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { err: "Application failed", error },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  // check applied job
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const jobId = searchParams.get("jobId");

    const db = await connect();

    if (userId && jobId) {
      // Check if a user has applied for a specific job
      const query =
        "SELECT * FROM applications WHERE user_id = ? AND job_id = ?";
      const [result] = await db.query(query, [userId, jobId]);
      return NextResponse.json({ applied: result.length > 0 }, { status: 200 });
    } else if (userId) {
      // Get all applications for a user
      const query = `
        SELECT a.*, j.positions, j.companyName 
        FROM applications a 
        JOIN jobs j ON a.job_id = j.id 
        WHERE a.user_id = ?
      `;
      const [results] = await db.query(query, [userId]);
      return NextResponse.json({ applications: results }, { status: 200 });
    } else if (jobId) {
      // Get all applicants for a job
      const query = `
        SELECT a.*, u.firstname, u.lastname, u.email 
        FROM applications a 
        JOIN users u ON a.user_id = u.id 
        WHERE a.job_id = ?
      `;
      const [results] = await db.query(query, [jobId]);
      return NextResponse.json({ applicants: results }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Missing userId or jobId" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { err: "Failed to retrieve application data", error },
      { status: 500 }
    );
  }
};
