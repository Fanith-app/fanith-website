import axios, { InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "./endpoint";

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

http.interceptors.request.use(
  (conf: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      if (token) {
        conf.headers.Authorization = `Bearer ${token}`;
      }
    }
    return conf;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default http;
