import { Router } from "express";

import * as authController from "../../controllers/auth.controller.js";
import validationResultHandler from "../../handlers/validationResult.handler.js";
import { logInRequest, signUpRequest } from "../../validations/auth.validation.js";
import { verifyToken } from '../../handlers/auth.handler.js'

const router = Router();

router.post("/signup", [signUpRequest, validationResultHandler], authController.signup);
router.post("/login", [logInRequest, validationResultHandler], authController.login);
router.get("/verify-token", verifyToken, authController.getToken)

export default router;
