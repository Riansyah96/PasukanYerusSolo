require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(express.json());

// MATERI PERTEMUAN 7: Menyajikan folder uploads agar bisa diakses browser
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', authRoutes);

// Error Middleware (Harus di paling bawah)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server aktif di port ${PORT}`);
    console.log("JWT Secret Status:", process.env.JWT_SECRET ? "TERDETEKSI ✅" : "TIDAK ADA ❌");
});