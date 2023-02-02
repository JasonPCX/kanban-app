import status from "http-status";
import HttpError from "../utils/httpError.js";
import { ValidationResultError } from "./validationResult.handler.js";

const handleError = (error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof ValidationResultError) {
    res.status(422).json({
      success: false,
      message: status["422_MESSAGE"],
      errors: error.errors,
    });
    return;
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
};

export default handleError;
