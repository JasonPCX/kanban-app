import status from "http-status";
import jwt from "jsonwebtoken";

import HttpError from "../utils/httpError.js";
import User from "../models/user.js";

const decodeToken = (req) => {
  const token = req.headers["authorization"].split(" ")[1];
  console.log("🚀 ~ file: auth.handler.js:9 ~ decodeToken ~ token", token);

  if (!token) return false;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🚀 ~ file: auth.handler.js:13 ~ decodeToken ~ decodedToken", decodedToken)

    return decodedToken;
  } catch {
    return false;
  }
};

export const verifyToken = async (req, res, next) => {
  const decodedToken = decodeToken(req);
  try {
    if (!decodedToken) throw new HttpError(status["401_MESSAGE"], 401);

    const user = await User.findById(decodedToken.id);

    if (!user) throw new HttpError(status["401_MESSAGE"], 401);

    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};
