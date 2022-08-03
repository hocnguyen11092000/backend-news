const ErrorHander = require("../utils/ErrorHander");

module.exports = (err, req, res, next) => {
  console.log("lỗi: " + err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //Wrong jsonwebtoken error
  if (err.code === "JsonWebTokenError") {
    const message = `Json web token is Invalid, try again`;
    err = new ErrorHander(message, 400);
  }

  //jwt expire error
  if (err.code === "TokenExpiredError") {
    const message = `Json web token is Expired, try again`;
    err = new ErrorHander(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
