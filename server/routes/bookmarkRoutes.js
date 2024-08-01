import express from "express";
import {
  addUserBookmark,
  deleteUserBookmark,
  getUserBookMarks,
} from "../controller/bookmarkController.js";
import { protect } from "../controller/authController.js";

const bookingRouter = express.Router();
bookingRouter.use(protect);

bookingRouter
  .route("/")
  .post(addUserBookmark)
  .delete(deleteUserBookmark)
  .get(getUserBookMarks);

export default bookingRouter;
