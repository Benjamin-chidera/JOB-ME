import mongoose, { Schema, Document, Model } from "mongoose";

interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  coverletter: string;
  resume: string;
}

const applicationSchema: Schema<IApplication> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    },
    coverletter: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Application: Model<IApplication> =
  mongoose.models.Application ||
  mongoose.model<IApplication>("Application", applicationSchema);

export default Application;
