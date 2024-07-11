import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2"; // Import this if you're using mysql2

// Define an interface for your application structure
interface Application extends RowDataPacket {
  application_id: number;
  user_id: number;
  job_id: number;
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  coverletter: string;
  resume: string;
  applied_at: Date;
  positions: string;
  companyName: string;
  companyImage: string;
  jobType: string;
  salary: string;
  country: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");
    const db = await connect();

    const q = `
        SELECT 
          a.id AS application_id,
          a.user_id,
          a.job_id,
          a.firstname,
          a.lastname,
          a.phonenumber,
          a.email,
          a.coverletter,
          a.resume,
          a.applied_at,
          j.positions,
          j.companyName,
          j.companyImage,
          j.jobType,
          j.salary,
          j.country
        FROM 
          applications a
        JOIN 
          jobs j ON a.job_id = j.id
        ${jobId ? "WHERE a.job_id = ?" : ""}
        ORDER BY 
          a.applied_at DESC
      `;

    const [rows] = await db.query<Application[]>(q, jobId ? [jobId] : []);

    await db.end();

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "No applications found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
};
