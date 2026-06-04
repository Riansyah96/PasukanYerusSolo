// backend/controllers/JobController.js
const pool = require('../config/db');

exports.index = async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT id_lowongan as id, judul_posisi as title, kategori, 
            tipe_pekerjaan as type, gaji, deskripsi_pekerjaan as deskripsi 
            FROM lowongan
        `);
        res.json({ data: rows });
    } catch (err) { next(err); }
};

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(`
            SELECT id_lowongan as id, judul_posisi as title, kategori, 
            tipe_pekerjaan as type, gaji, deskripsi_pekerjaan as deskripsi 
            FROM lowongan WHERE id_lowongan = ?`, [id]
        );
        res.json({ data: rows[0] });
    } catch (err) { next(err); }
};

exports.store = async (req, res, next) => {
    try {
        // Tambahkan logika insert data Anda di sini
        // const { judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan } = req.body;
        // await pool.query("INSERT INTO lowongan ...", [...]);
        res.status(201).json({ message: "Berhasil menambahkan lowongan" });
    } catch (err) { next(err); }
};