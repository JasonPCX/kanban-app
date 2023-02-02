import User from "../models/user.js";
import { generateHashPassword, verifyPassword } from "../utils/encryption.js";
import HttpError from "../utils/httpError.js";

export const signup = async (req, res, next) => {
  const { password, username } = req.body;

  try {
    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) throw new HttpError("Username has already been taken.", 401);

    const hashedPassword = await generateHashPassword(password);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    const token = user.generateAuthToken();

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { password, username } = req.body;

  try {
    const user = await User.findOne({
      username,
    }).select("username password");

    if (!user) {
      throw new HttpError("Invalid credentials.");
    }

    const isValidLogin = await verifyPassword(user.password, password);

    if (!isValidLogin) {
      throw new HttpError("Invalid credentials.");
    }

    const token = user.generateAuthToken();

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getToken = (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
