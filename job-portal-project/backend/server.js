require('dotenv').config(); // Baris 1: Wajib untuk membaca .env
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(express.json());

// Load semua rute
app.use('/api', authRoutes);

// Error Middleware harus di bawah rute
app.use(errorMiddleware);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server aktif di port ${PORT}`);
    // Log ini untuk memastikan JWT_SECRET terbaca (hapus setelah berhasil)
    console.log("JWT Secret Terdeteksi:", process.env.JWT_SECRET ? "Ya" : "Tidak");
});