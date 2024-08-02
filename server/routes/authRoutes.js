import express from "express";
import {
  userLogin,
  userLogout,
  userSignup,
} from "../controller/authController.js";
import { protect } from "../middlewares/JWTVerification.js";

const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/login", userLogin);
authRouter.post("/logout", protect, userLogout);

export default authRouter;
