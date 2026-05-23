import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5005/api', // Sesuaikan dengan port backend kamu
});

// Otomatis tempelkan Token JWT jika ada di localStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;