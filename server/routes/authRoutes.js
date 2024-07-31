import express from "express";
import {
  protect,
  userLogin,
  userLogout,
  userSignup,
} from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/login", userLogin);
authRouter.post("/logout", protect, userLogout);

export default authRouter;
