/* eslint-disable no-undef */
// import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/connect.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/authRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
import searchRouter from "./routes/searchRoutes.js";
import tvSeriesRouter from "./routes/tvSeriesRoutes.js";
import userRoute from "./routes/userRoutes.js";

import {
  glbalErrorHandler,
  unhandledRoutes,
} from "./controller/errorController.js";
import bookmarkRouter from "./routes/bookmarkRoutes.js";
import otherMediaRouter from "./routes/otherMediaRoutes.js";

// connect to the mongoDb database
await connectDB();

// middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://entertainment-app-sandy.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Route middlewares
app.use("/api/user", authRouter);
app.use("/api/movies", movieRouter);
app.use("/api/tvSeries", tvSeriesRouter);
app.use("/api/searchMovieOrTv", searchRouter);
app.use("/api/media", otherMediaRouter);
app.use("/api/user/bookmark", bookmarkRouter);
app.use("/api/userDetails", userRoute);

// unhandled routes and errors
app.use("*", unhandledRoutes);
app.use(glbalErrorHandler);

//start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("✅ Server started successfully");
});
