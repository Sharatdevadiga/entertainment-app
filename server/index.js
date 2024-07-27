/* eslint-disable no-undef */
import "dotenv/config";
import connectDB from "./config/connect.js";
import express from "express";
import authRouter from "./routes/authRoutes.js";

// connect to the mongoDb database
await connectDB();

// middlewares
const app = express();
app.use(express.json());

// Route middlewares
app.use("/api/user", authRouter);

//start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("✅ Server started successfully");
});
