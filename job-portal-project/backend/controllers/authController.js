// controllers/authController.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const { nama, email, password, role } = req.body;
        
        const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)',
            [nama, email, hashedPassword, role || 'Pelamar']
        );
        
        res.status(201).json({ status: 'success', message: 'Registrasi berhasil' });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }
        
        const user = users[0];
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }
        
        const payload = { 
            id: user.id_user,
            email: user.email, 
            role: user.role 
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.json({
            status: 'success',
            token: token,
            user: {
                id_user: user.id_user,
                nama: user.nama,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const [users] = await pool.query(
            'SELECT id_user, nama, email, role FROM users WHERE id_user = ?',
            [req.user.id_user]
        );
        if (users.length === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        res.json({ data: users[0] });
    } catch (err) {
        next(err);
    }
};

exports.getAllJobs = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM lowongan');
        res.json({ status: 'success', data: rows });
    } catch (err) {
        next(err);
    }
};

exports.createJob = async (req, res, next) => {
    try {
        const { judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan } = req.body;
        await pool.query(
            'INSERT INTO lowongan (id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan) VALUES (?, ?, ?, ?, ?, ?)',
            [req.user.id_user, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan]
        );
        res.status(201).json({ status: 'success', message: 'Lowongan dipublikasikan' });
    } catch (err) {
        next(err);
    }
};

exports.deleteJob = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM lowongan WHERE id_lowongan = ?', [id]);
        res.json({ status: 'success', message: 'Lowongan berhasil dihapus' });
    } catch (err) {
        next(err);
    }
};

exports.applyJob = async (req, res, next) => {
    try {
        const { id_lowongan, pesan_tambahan } = req.body;
        const pelamar_id = req.user.id_user;
        const cv_file = req.file ? req.file.filename : null;

        await pool.query(
            "INSERT INTO lamaran (id_lowongan, id_pelamar, cv_path, pesan_tambahan, status) VALUES (?, ?, ?, ?, 'Pending')",
            [id_lowongan, pelamar_id, cv_file, pesan_tambahan]
        );
        res.status(201).json({ status: "success", message: "Lamaran berhasil dikirim" });
    } catch (err) {
        next(err);
    }
};

exports.updateCompanyProfile = async (req, res, next) => {
    try {
        const { nama_perusahaan, deskripsi, alamat, telepon, website } = req.body;
        const logo = req.file ? req.file.filename : null;
        
        if (logo) {
            await pool.query(
                'INSERT INTO profil_perusahaan (id_user, nama_perusahaan, deskripsi, alamat, telepon, website, logo) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE nama_perusahaan=?, deskripsi=?, alamat=?, telepon=?, website=?, logo=?',
                [req.user.id_user, nama_perusahaan, deskripsi, alamat, telepon, website, logo, nama_perusahaan, deskripsi, alamat, telepon, website, logo]
            );
        } else {
            await pool.query(
                'INSERT INTO profil_perusahaan (id_user, nama_perusahaan, deskripsi, alamat, telepon, website) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE nama_perusahaan=?, deskripsi=?, alamat=?, telepon=?, website=?',
                [req.user.id_user, nama_perusahaan, deskripsi, alamat, telepon, website, nama_perusahaan, deskripsi, alamat, telepon, website]
            );
        }
        
        res.json({ status: 'success', message: 'Profil perusahaan diperbarui' });
    } catch (err) {
        next(err);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE id_user = ?',
            [req.user.id_user]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Profil tidak ditemukan' });
        }
        res.json({ data: rows[0] });
    } catch (err) {
        next(err);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { nama, telepon, keahlian, tentang_saya } = req.body;
        const foto = req.files?.foto ? req.files.foto[0].filename : null;
        const cv = req.files?.cv ? req.files.cv[0].filename : null;
        
        let query = 'UPDATE users SET nama = ?, telepon = ?, keahlian = ?, tentang_saya = ?';
        let params = [nama, telepon, keahlian, tentang_saya];
        
        if (foto) {
            query += ', foto = ?';
            params.push(foto);
        }
        
        query += ' WHERE id_user = ?';
        params.push(req.user.id_user);
        
        await pool.query(query, params);
        
        if (cv) {
            await pool.query(
                'INSERT INTO profil_pencari_kerja (id_user, cv_path) VALUES (?, ?) ON DUPLICATE KEY UPDATE cv_path = ?',
                [req.user.id_user, cv, cv]
            );
        }
        
        res.json({ status: 'success', message: 'Profil berhasil diperbarui' });
    } catch (err) {
        next(err);
    }
};