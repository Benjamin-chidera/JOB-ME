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
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
