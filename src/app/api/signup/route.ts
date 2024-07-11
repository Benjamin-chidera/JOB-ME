import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connect } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { firstname, lastname, email, password, role } = await req.json();

    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json({ err: "Fill all fields" }, { status: 400 });
    }

    const db = await connect();

    const checkEmailAddressQuery = "SELECT * FROM users WHERE email=?";
    const [checkEmailAddress] = await db.query(checkEmailAddressQuery, [email]);

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

    const [result] = await db.query(insertUserQuery, values);
    await db.end();

    return NextResponse.json(
      { msg: "Registration Successful", result },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
};
