import { server } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import crypto from "crypto";
import { sendEmail } from "@/libs/sendEmail";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  try {
    await server();

    // Check if the user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Email does not exist" },
        { status: 404 } // Use 404 for not found
      );
    }

    // Generate and hash the reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token expiry (1 hour from now)
    existingUser.resetToken = hashedToken;
    existingUser.resetTokenExpiry = Date.now() + 3600000;

    // Save the user with the new reset token
    await existingUser.save();

    console.log(resetToken);
    

    // Construct the reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;

    // Prepare email details
    const subject = "Password Reset Request";
    const message = `
      You requested a password reset. Please click on the following link to reset your password:
      <a href="${resetUrl}">${resetUrl}</a>
    `;
    const send_to = email;
    const sent_from = process.env.EMAIL_USER; // Your email address
    const reply_to = email;

    // Send the password reset email
    await sendEmail(subject, message, sent_from, reply_to, send_to);

    return NextResponse.json(
      { message: "Password reset email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in password reset:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
};
