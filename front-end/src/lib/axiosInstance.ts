import axios from "axios";

export const axiosInstance = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
