import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";

const { isEmail } = validator;

interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  resetToken: string;
  resetTokenExpiry: number;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: true,
      minLength: [7, "Please should be at least 7 characters"],
    },
    role: {
      type: String,
      required: true,
      enum: ["jobseeker", "employer"],
      default: "jobseeker",
    },
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
