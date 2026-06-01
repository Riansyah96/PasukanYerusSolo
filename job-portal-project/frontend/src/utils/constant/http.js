import axios from "axios";

// Membuat Instance Axios terpusat
const http = axios.create({
  baseURL: "/api", // Menggunakan proxy Vite menuju backend Express JS Anda
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * INTERCEPTOR: Otomatis menyisipkan JWT Token ke setiap request 
 * jika token tersedia di dalam localStorage browser
 */
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;