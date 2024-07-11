import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const db = await connect();

    const q = `
      SELECT jobs.*
      FROM jobs
      JOIN users ON jobs.user_id = users.id
      WHERE users.role = 'employer'
    `;

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
