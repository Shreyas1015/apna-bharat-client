import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://apna-bharat-server-2.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
