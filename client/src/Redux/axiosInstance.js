import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) 
);

export default axiosInstance;