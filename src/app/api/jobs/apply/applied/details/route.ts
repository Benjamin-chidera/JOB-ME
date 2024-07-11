import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

interface ApplicationRow extends RowDataPacket {
  application_id: number;
  user_id: string;
  job_id: string;
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
  salary: number;
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
        WHERE 
          a.job_id = ?
        ORDER BY 
          a.applied_at DESC
      `;

    const [rows] = await db.query<ApplicationRow[]>(q, [jobId]);
    const getOne = rows[0];
    await db.end();

    return NextResponse.json(getOne || null, { status: 200 });
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
