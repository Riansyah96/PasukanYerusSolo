require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const favoritRoutes = require('./routes/favoritRoutes');
const applyRoutes = require('./routes/applyRoutes');
const lamaranRoutes = require('./routes/lamaranRoutes');
const adminRoutes = require('./routes/adminRoutes');
const testimoniRoutes = require('./routes/testimoniRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/favorit', favoritRoutes);
app.use('/api/apply', applyRoutes);
app.use('/api/lamaran', lamaranRoutes);
app.use('/api/admin', adminRoutes);  // <-- PASTIKAN INI ADA
app.use('/api/testimonials', testimoniRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Available routes:');
    console.log('  - /api/auth');
    console.log('  - /api/jobs');
    console.log('  - /api/favorit');
    console.log('  - /api/apply');
    console.log('  - /api/lamaran');
    console.log('  - /api/admin');
    console.log('  - /api/testimonials');
});