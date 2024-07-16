import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";

const { isEmail } = validator;

interface IContact extends Document {
  name: string;
  phonenumber: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSchema: Schema<IContact> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phonenumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },

    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
