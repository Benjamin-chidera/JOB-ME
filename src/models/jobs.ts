import mongoose, { Schema, Document, Model } from "mongoose";

interface IJobs extends Document {
  positions: string;
  companyName: string;
  companyImage: string;
  jobType: string;
  country: string;
  salary: number;
  experience: number;
  description: string;
  responsibilities: string[];
  skills: string[];
  user_id: mongoose.Types.ObjectId;
}

const jobSchema: Schema<IJobs> = new mongoose.Schema(
  {
    positions: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyImage: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: [String],
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Jobs: Model<IJobs> =
  mongoose.models.Jobs || mongoose.model<IJobs>("Jobs", jobSchema);

export default Jobs;
