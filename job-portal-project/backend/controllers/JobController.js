// backend/controllers/JobController.js
const pool = require('../config/db');

exports.index = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT id_lowongan as id, judul_posisi as title, kategori, gaji, deskripsi_pekerjaan as deskripsi FROM lowongan');
        res.json({ data: rows });
    } catch (err) { next(err); }
};

exports.store = async (req, res, next) => {
    // ... logika store ...
    res.status(201).json({ message: "Berhasil" });
};

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            'SELECT id_lowongan as id, judul_posisi as title, kategori, gaji, deskripsi_pekerjaan as deskripsi FROM lowongan WHERE id_lowongan = ?', 
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ message: "Tidak ditemukan" });
        res.json({ data: rows[0] });
    } catch (err) { next(err); }
};