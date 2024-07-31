import express from "express";
import {
  addBookmark,
  deleteBookmark,
  getBookMarks,
} from "../controller/bokingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", addBookmark);
bookingRouter.delete("/", deleteBookmark);
bookingRouter.get("/", getBookMarks);

export default bookingRouter;
