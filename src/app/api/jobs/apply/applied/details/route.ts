import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";

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
        ORDER BY 
          a.applied_at DESC
      `;

    const [rows] = await db.query(q, jobId);
    const getOne = rows[0];
    await db.end();

    return NextResponse.json(getOne, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
