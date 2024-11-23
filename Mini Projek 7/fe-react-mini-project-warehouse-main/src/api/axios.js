import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // URL JSON-Server
});

export default axiosInstance;
