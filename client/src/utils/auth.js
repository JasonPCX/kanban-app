import authService from "../api/authService";
import { getToken } from "./jwt";

export const verifyAuth = async () => {
  const token = getToken();
  if (!token) return false;

  try {
    const authResponse = await authService.verifyToken();
    return authResponse.user;
  } catch (error) {
    return false;
  }
};
