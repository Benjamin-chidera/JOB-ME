import mongoose from "mongoose";

export const server = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, { dbName: "jobme" });
    console.log(`server listening`);
  } catch (error) {
    console.log(error);
  }
};