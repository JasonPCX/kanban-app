import { body } from "express-validator";

export const logInRequest = [
  body("username").notEmpty().withMessage("Username field is required."),
  body("password").notEmpty().withMessage("Password field is require.d"),
];

export const signUpRequest = [
  ...logInRequest,
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long, and a combination of uppercase letters, lowercase letters, numbers, and symbols."
    ),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
];
