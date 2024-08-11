import express from "express";
import { getUserDetails } from "../controller/userController.js";
import { protect } from "../middlewares/jwtVerification.js";

const userRoute = express.Router();

userRoute.get("/", protect, getUserDetails);

export default userRoute;
