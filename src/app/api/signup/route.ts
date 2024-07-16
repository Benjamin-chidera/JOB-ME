import bcrypt from "bcrypt";
import { server } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

export const POST = async (req: NextRequest) => {
  try {
    const { firstname, lastname, email, password, role } = await req.json();

    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json({ err: "Fill all fields" }, { status: 400 });
    }

    await server();

    const user = await User.findOne({ email });

    if (user) {
      throw new Error("Email already in use");
    }

    const hashed = await bcrypt.hash(password, 10);

    const registered = await User.create({
      firstname,
      lastname,
      email,
      password: hashed,
      role,
    });

    return NextResponse.json(
      { msg: "Registration Successful", registered },
      { status: 201 }
    );
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
