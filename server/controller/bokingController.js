import { errorHandler, successHandler } from "../utils/handlers.js";

// export const addBookmark = asyncHandler()
// export const deleteBookmark = asyncHandler()
// export const getBookMarkk= asyncHandler()

export const addBookmark = async function (req, res, next) {
  try {
    successHandler(res, 200, ["Implementing the add bookmerk route"]);
  } catch (err) {
    errorHandler(res, 404, "Failed route handling", err);
  }
  next();
};

export const deleteBookmark = async function (req, res, next) {
  try {
    successHandler(res, 200, ["Implementing the delete bookmerk route"]);
  } catch (err) {
    errorHandler(res, 404, "Failed route handling", err);
  }
  next();
};

export const getBookMarks = async function (req, res, next) {
  try {
    successHandler(res, 200, ["Implementing the get bookmerk route"]);
  } catch (err) {
    errorHandler(res, 404, "Failed route handling", err);
  }
  next();
};
