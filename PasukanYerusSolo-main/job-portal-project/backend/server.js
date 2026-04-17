const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/api', authRoutes);

// WAJIB: Letakkan di paling bawah setelah semua rute
app.use(errorMiddleware);

app.listen(5005, () => console.log("Server aktif di port 5005"));