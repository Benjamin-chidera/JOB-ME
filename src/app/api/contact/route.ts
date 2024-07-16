import { server } from "@/libs/connect";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/libs/sendEmail";
import Contact from "@/models/contact";

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, phonenumber, subject, message } = await req.json();
    await server();

    const result = await Contact.create({
      name,
      email,
      phonenumber,
      subject,
      message,
    });

    const replyMessage = `Thank you for contacting JOBME ${name} with the email ${email} and phone number ${phonenumber}. We will get be to you immediately.`;
    const subjects = subject;
    const messages = ` Your message ${message}. => Our Message: ${replyMessage}`;
    const send_to = email;
    const sent_from = process.env.EMAIL_USER; // Your email address
    const reply_to = email;
    await sendEmail(subjects, messages, sent_from, reply_to, send_to);

    return NextResponse.json(
      { msg: "Contact sent successfully", result },
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
