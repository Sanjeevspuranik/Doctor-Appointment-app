const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //mongoose cast error
  if (error.name === "castError") {
    const message = "Resource not found";
    error = new errorResponse(message, 404);
  }

  //duplicate key error
  if (error.code === 11000) {
    const message = "duplicate value field error";
    error = new errorResponse(message, 400);
  }

  //mongoose validation error
  if (error.name === "ValidationError") {
    const message = Object.values(err.error).map((val) => val.message);
    error = new errorResponse(message, 400);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "server not found",
    });
  }
};

module.exports = errorHandler;
