import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {params}) => {
    const {id} = params
  try {
    const db = await connect();

    const q = `
     SELECT * FROM jobs WHERE id =?
    `;

    const [rows] = await db.query(q, id);
    const getOne = rows[0]
    await db.end();

    return NextResponse.json(getOne, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
