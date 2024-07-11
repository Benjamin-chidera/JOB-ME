import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket, OkPacket } from "mysql2"; // Import these if you're using mysql2

// Define interfaces for your database results
interface Application extends RowDataPacket {
  id: number;
  user_id: number;
  job_id: number;
  // Add other fields as necessary
}

interface JobApplication extends Application {
  positions: string;
  companyName: string;
}

interface ApplicantInfo extends Application {
  firstname: string;
  lastname: string;
  email: string;
}

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
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const jobId = searchParams.get("jobId");

    const db = await connect();

    if (userId && jobId) {
      // Check if a user has applied for a specific job
      const query =
        "SELECT * FROM applications WHERE user_id = ? AND job_id = ?";
      const [result] = await db.query<Application[]>(query, [userId, jobId]);
      return NextResponse.json({ applied: result.length > 0 }, { status: 200 });
    } else if (userId) {
      // Get all applications for a user
      const query = `
        SELECT a.*, j.positions, j.companyName 
        FROM applications a 
        JOIN jobs j ON a.job_id = j.id 
        WHERE a.user_id = ?
      `;
      const [results] = await db.query<JobApplication[]>(query, [userId]);
      return NextResponse.json({ applications: results }, { status: 200 });
    } else if (jobId) {
      // Get all applicants for a job
      const query = `
        SELECT a.*, u.firstname, u.lastname, u.email 
        FROM applications a 
        JOIN users u ON a.user_id = u.id 
        WHERE a.job_id = ?
      `;
      const [results] = await db.query<ApplicantInfo[]>(query, [jobId]);
      return NextResponse.json({ applicants: results }, { status: 200 });
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
