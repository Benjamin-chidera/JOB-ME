import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2"; // Import this if you're using mysql2

// Define an interface for your job structure
interface Job extends RowDataPacket {
  id: number;
  // Add other fields that your job has
  title?: string;
  description?: string;
  // ... other fields
}

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const db = await connect();

    const q = `
     SELECT * FROM jobs WHERE id = ?
    `;

    const [rows] = await db.query<Job[]>(q, [id]);
    const getOne = rows[0];
    await db.end();

    if (!getOne) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(getOne, { status: 200 });
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
