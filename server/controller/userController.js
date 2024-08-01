import User from "../models/userModel.js";
import { errorHandler, successHandler } from "../utils/handlers.js";

export const getUserDetails = async function (req, res, next) {
  try {
    let userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    if (!user) return errorHandler(res, 404, "User not found");

    successHandler(res, 200, user);
    next();
  } catch (err) {
    errorHandler(res, 404, "User not found", err);
  }
};
