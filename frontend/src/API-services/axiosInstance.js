import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:80", 
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
    // "Accept": "application/json",
    // "Access-Control-Allow-Headers": "Access-Control-Allow-Headers','Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization"
  },
});

export default axiosInstance