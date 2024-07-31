import express from "express";
import {
  userLogin,
  userLogout,
  userSignup,
} from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);

export default authRouter;
