module.exports = class AppError extends Error {
  constructor(msg, code) {
    super(msg);
    this.statusCode = code;
    this.status = `${code}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
};
