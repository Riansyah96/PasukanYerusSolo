// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5005/api', // Sesuaikan port ke 5005
});

// Tambahkan interceptor untuk menyisipkan token otomatis jika user sudah login
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token; // Sesuai dengan middleware auth.js tadi
  }
  return req;
});

export default API;