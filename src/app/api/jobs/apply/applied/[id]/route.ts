import Jobs from "@/models/jobs";
import { NextRequest, NextResponse } from "next/server";
import { server } from "@/libs/connect";
import Application from "@/models/applications";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    await server();

    console.log(id);

    const getOne = await Application.findById(id);

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
