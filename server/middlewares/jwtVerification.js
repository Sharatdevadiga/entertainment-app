/* eslint-disable no-undef */
import User from "../models/userModel.js";
import jsonwebtoken from "jsonwebtoken";
import { errorHandler } from "../utils/handlers.js";

//
export async function protect(req, res, next) {
  let token;
  const headerCondition =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");

  // 1. Get the token from cookie or authorization header
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (headerCondition) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. If token was not there then suggest to login
  if (!token) {
    return errorHandler(res, 401, "You must be logged in to access this route");
  }

  // 3. verify the token, find the user and attach user on req object for next middleware
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded.userId).select("-password");

    if (!user) return errorHandler(res, 404, "User no longe exists");
    req.user = user;
    next();
  } catch (err) {
    return errorHandler(res, 401, "Not authorized! token failed", err);
  }
}
