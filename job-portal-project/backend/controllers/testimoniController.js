const pool = require('../config/db');

let tableReady = false;

const initTable = async () => {
    if (tableReady) return;
    try {
        await pool.query('SELECT id, status FROM testimonials LIMIT 1');
    } catch {
        await pool.query('DROP TABLE IF EXISTS testimonials');
        await pool.query(`
            CREATE TABLE testimonials (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nama VARCHAR(255) NOT NULL,
                role VARCHAR(255) DEFAULT '',
                perusahaan VARCHAR(255) DEFAULT '',
                teks TEXT NOT NULL,
                rating INT DEFAULT 5,
                status ENUM('pending','approved','rejected') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
    tableReady = true;
};

exports.index = async (req, res, next) => {
    try {
        await initTable();
        const [rows] = await pool.query(
            'SELECT id, nama, role, perusahaan, teks, rating, created_at FROM testimonials WHERE status = ? ORDER BY created_at DESC',
            ['approved']
        );
        res.json(rows);
    } catch (err) { next(err); }
};

exports.store = async (req, res, next) => {
    try {
        await initTable();
        const { nama, role, perusahaan, teks, rating } = req.body;
        if (!nama || !teks) {
            return res.status(400).json({ message: 'Nama dan teks testimonial wajib diisi' });
        }
        await pool.query(
            'INSERT INTO testimonials (nama, role, perusahaan, teks, rating, status) VALUES (?, ?, ?, ?, ?, ?)',
            [nama, role || '', perusahaan || '', teks, rating || 5, 'approved']
        );
        res.status(201).json({ message: 'Testimonial berhasil dikirim!' });
    } catch (err) { next(err); }
};
