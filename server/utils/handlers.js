export const successHandler = function (res, statusCode = 200, data) {
  res.status(statusCode).json({
    status: "success",
    data,
  });
};

export const errorHandler = function (
  res,
  statusCode = 404,
  message = "operation failed",
  err = null
) {
  if (err) {
    console.log("💥💥💥");
    console.error(err);
    console.log("💥💥💥");
  }

  res.status(statusCode).json({
    status: "fail",
    message: message || err.message,
  });
};

// get an async function and object with status codes and message, wrap the async function with try catch
export const asyncHandler = function (
  fn,
  {
    successStatusCode = 200,
    errorMessage = "Page not found",
    errorStatusCode = 404,
  }
) {
  return async function (req, res, next) {
    try {
      // execute the async function
      const data = await fn(req, res, next);

      // if gets data then send it as response
      if (data) successHandler(res, successStatusCode, data);
      next();
    } catch (err) {
      errorHandler(res, errorStatusCode, errorMessage, err);
    }
  };
};
