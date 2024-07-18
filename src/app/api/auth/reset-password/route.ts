import { server } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    await server();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token is invalid or has expired" },
        { status: 400 }
      );
    }

    // Add password validation
    // if (password.length < 8) {
    //   return NextResponse.json(
    //     { error: "Password must be at least 8 characters long" },
    //     { status: 400 }
    //   );
    // }

    user.password = await bcrypt.hash(password, 10);
    // user.resetToken = undefined;
    // user.resetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password has been reset successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in reset password:", error);
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
