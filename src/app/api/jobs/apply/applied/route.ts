// /job/apply/applied
import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const jobId = searchParams.get("jobId");

    if (!userId && !jobId) {
      return NextResponse.json(
        { error: "Missing userId or jobId" },
        { status: 400 }
      );
    }

    const db = await connect();

    if (userId) {
      // Get all jobs applied by a specific user along with applicant details
      const query = `
        SELECT j.*, a.applied_at, a.firstname, a.lastname, a.phonenumber, a.email, a.coverletter, a.resume
        FROM applications a
        JOIN jobs j ON a.job_id = j.id
        WHERE a.user_id = ?
        ORDER BY a.applied_at DESC
      `;
      const [results] = await db.query(query, [userId]);
      return NextResponse.json({ appliedJobs: results }, { status: 200 });
    } else if (jobId) {
      // Get all applicants for a specific job along with job details
      const query = `
        SELECT a.*, u.firstname AS user_firstname, u.lastname AS user_lastname, u.email AS user_email, j.positions, j.companyName, j.companyImage,j.jobType, j.salary, j.country
        FROM applications a
        JOIN users u ON a.user_id = u.id
        JOIN jobs j ON a.job_id = j.id
        WHERE a.job_id = ?
        ORDER BY a.applied_at DESC
      `;
      const [results] = await db.query(query, [jobId]);
      return NextResponse.json({ applicants: results }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { err: "Failed to retrieve application data", error },
      { status: 500 }
    );
  }
};

