import express from "express";
import { getUserDetails } from "../controller/userController.js";
import { protect } from "../controller/authController.js";

const userRoute = express.Router();

userRoute.get("/", protect, getUserDetails);

export default userRoute;
