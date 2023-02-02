import { validationResult } from "express-validator";

export class ValidationResultError{
  constructor(errors) {
    this.errors = errors;
  }
}

const validationResultHandler = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new ValidationResultError(result.mapped());
  }
  next();
};

export default validationResultHandler;
