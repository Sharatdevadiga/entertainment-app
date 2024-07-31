export const unhandledRoutes = function (req, res, next) {
  if (!res.headersSent) {
    res.status(400).json({ message: "This route is not defined" });
  } else {
    next();
  }
};

export const glbalErrorHandler = function (err, req, res, next) {
  if (!res.headersSent) {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  } else {
    next(err);
  }
};
