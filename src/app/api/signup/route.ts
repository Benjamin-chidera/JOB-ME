import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket, OkPacket } from "mysql2"; // Import these if you're using mysql2

// Define an interface for your user structure
interface User extends RowDataPacket {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const { firstname, lastname, email, password, role } = await req.json();

    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json({ err: "Fill all fields" }, { status: 400 });
    }

    const db = await connect();

    const checkEmailAddressQuery = "SELECT * FROM users WHERE email=?";
    const [checkEmailAddress] = await db.query<User[]>(checkEmailAddressQuery, [
      email,
    ]);

    if (checkEmailAddress.length > 0) {
      await db.end();
      return NextResponse.json(
        { errMsg: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery =
      "INSERT INTO users (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)";
    const values = [firstname, lastname, email, hashedPassword, role];

    const [result] = await db.query<OkPacket>(insertUserQuery, values);
    await db.end();

    return NextResponse.json(
      { msg: "Registration Successful", result },
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
