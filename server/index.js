/* eslint-disable no-undef */
import "dotenv/config";
import connectDB from "./config/connect.js";
import express from "express";

import authRouter from "./routes/authRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
import searchRouter from "./routes/searchRoutes.js";
import tvSeriesRouter from "./routes/tvSeriesRoutes.js";
import {
  glbalErrorHandler,
  unhandledRoutes,
} from "./controller/errorController.js";
import bookingRouter from "./routes/bookmarkRoutes.js";
import cookieParser from "cookie-parser";

// connect to the mongoDb database
await connectDB();

// middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());

// Route middlewares
app.use("/api/user", authRouter);
app.use("/api/movies", movieRouter);
app.use("/api/tvSeries", tvSeriesRouter);
app.use("/api/searchMovieOrTv", searchRouter);
app.use("/api/user/bookmark", bookingRouter);

// unhandled routes and errors
app.use("*", unhandledRoutes);
app.use(glbalErrorHandler);

//start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("✅ Server started successfully");
});
