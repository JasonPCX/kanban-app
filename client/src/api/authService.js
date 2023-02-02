import axiosClient from './axiosClient';

const authService = {
  signup: (payload) => axiosClient.post("auth/signup", payload),
  login: (payload) => axiosClient.post("auth/login", payload),
  verifyToken: () => axiosClient.get("auth/verify-token"),
};

export default authService;
