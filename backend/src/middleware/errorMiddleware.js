import logger from "../utils/logger.js";

export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFound = (req, res, next) => {
  const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    logger.error("Error handler caught error:", err, { path: req.originalUrl });
    res.status(err.statusCode).json({
      success: false,
      error: err.message || err.status,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production Mode: Don't leak stack traces
    if (err.isOperational) {
      logger.warn(`Operational Error: ${err.message}`, { path: req.originalUrl, statusCode: err.statusCode });
      res.status(err.statusCode).json({
        success: false,
        error: err.message || err.status,
        message: err.message,
      });
    } else {
      // Programming or other unknown errors
      logger.error("FATAL ERROR occurred:", err, { path: req.originalUrl });
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
        message: "Something went very wrong!",
      });
    }
  }
};