import express from "express";
import {
  addBookmark,
  deleteBookmark,
  getBookMarks,
} from "../controller/bookmarkController.js";
import { protect } from "../controller/authController.js";

const bookingRouter = express.Router();
bookingRouter.use(protect);

bookingRouter
  .route("/")
  .post(addBookmark)
  .delete(deleteBookmark)
  .get(getBookMarks);

// bookingRouter.post("/", addBookmark);
// bookingRouter.delete("/", deleteBookmark);
// bookingRouter.get("/", getBookMarks);

export default bookingRouter;
