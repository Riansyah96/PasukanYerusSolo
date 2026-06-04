const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- REGISTER ---
exports.register = async (req, res, next) => {
    try {
        // Sesuaikan dengan nama variabel yang dikirim dari frontend
        const { nama, email, password, role } = req.body;
        
        // Validasi input dasar agar tidak 500 error jika ada data kosong
        if (!nama || !email || !password) {
            return res.status(400).json({ message: "Semua field harus diisi" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPath = await bcrypt.hash(password, salt);

        await pool.query(
            "INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)",
            [nama, email, hashedPath, role || 'Pelamar']
        );
        res.status(201).json({ status: "success", message: "User berhasil didaftarkan" });
    } catch (err) { next(err); }
};
// --- LOGIN ---
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
            return res.status(401).json({ status: "fail", message: "Email atau password salah" });
        }

        const token = jwt.sign({ id: rows[0].id, role: rows[0].role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        });

        res.json({ status: "success", token });
    } catch (err) { next(err); }
};

exports.updatePassword = async (req, res, next) => {
    try {
        const { password_lama, password_baru } = req.body;
        const [rows] = await pool.query("SELECT password FROM users WHERE id = ?", [req.user.id]);

        if (!(await bcrypt.compare(password_lama, rows[0].password))) {
            return res.status(401).json({ status: "fail", message: "Password lama tidak sesuai" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPath = await bcrypt.hash(password_baru, salt);

        await pool.query("UPDATE users SET password = ? WHERE id = ?", [hashedPath, req.user.id]);
        res.json({ status: "success", message: "Password berhasil diperbarui" });
    } catch (err) { next(err); }
};