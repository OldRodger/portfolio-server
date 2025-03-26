const AppError = require("../util/AppError");
const mongoose = require("mongoose");

function sendDevErr(err, res) {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
}

function sendProdErr(err, res) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(err.statusCode).json({
    status: err.status,
    message: "Something went wrong",
  });
}

module.exports = (err, req, res, next) => {
  const { NODE_ENV } = process.env;
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (NODE_ENV === "development") return sendDevErr(err, res);

  let error = err;

  if (err instanceof mongoose.Error.ValidationError)
    error = handleValidationError(err);

  sendProdErr(error, res);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors)
    .map((e) => e.message)
    .reverse()
    .join(". ");
  const message = `Invalid input data. ${errors}`;
  return new AppError(message, 400);
};
