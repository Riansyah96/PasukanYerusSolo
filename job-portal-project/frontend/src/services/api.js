import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5005/api', // Menembak ke port backend Express Anda
    headers: {
        'Content-Type': 'application/json'
    }
});

// Menyisipkan token Bearer otomatis untuk rute yang diproteksi middleware auth backend
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;