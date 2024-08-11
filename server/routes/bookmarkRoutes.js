import express from "express";
import {
  addUserBookmark,
  deleteUserBookmark,
  getUserBookMarks,
} from "../controller/bookmarkController.js";
import { protect } from "../middlewares/jwtVerification.js";

const bookmarkRouter = express.Router();
bookmarkRouter.use(protect);

bookmarkRouter
  .route("/")
  .post(addUserBookmark)
  .delete(deleteUserBookmark)
  .get(getUserBookMarks);

export default bookmarkRouter;
