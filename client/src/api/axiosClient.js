import axios from "axios";
import queryString from "query-string";
import { getToken } from "../utils/jwt";

const baseURL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: {
    serialize: (params) => queryString.stringify({ params }),
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && "data" in response) return response.data;
    return response;
  },
  (error) => {
    if (!("response" in error)) {
      console.error(error);
      return;
    }

    throw error.response;
  }
);

export default axiosClient;
