import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

console.log("BASE_URL", process.env.NEXT_PUBLIC_BASE_URL);

export default axiosInstance;
