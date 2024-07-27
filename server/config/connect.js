/* eslint-disable no-undef */
import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("💥 MongoDB connection failed", err);
    process.exit(1);
  }
}
