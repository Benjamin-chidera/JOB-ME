import nodemailer from "nodemailer";
export const sendEmail = async (
  subjects: any,
  messages: any,
  send_to: any,
  sent_from: any,
  reply_to: any
) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.EMAIL_HOST,
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const options = {
      from: sent_from,
      to: send_to,
      replyTo: reply_to,
      subject: subjects,
      html: messages,
    };

    // Send email
    const info = await transporter.sendMail(options);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};
