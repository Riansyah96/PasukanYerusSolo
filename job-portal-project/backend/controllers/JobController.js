
const pool = require('../config/db');

exports.index = async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT id_lowongan as id, judul_posisi as title, kategori, 
            tipe_pekerjaan as type, gaji, deskripsi_pekerjaan as deskripsi,
            tanggal_posting as created_at
            FROM lowongan
        `);
        res.json({ data: rows });
    } catch (err) { next(err); }
};

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(`
            SELECT 
                l.id_lowongan as id, l.judul_posisi as title, l.kategori, 
                l.tipe_pekerjaan as type, l.gaji, l.deskripsi_pekerjaan as deskripsi,
                pp.nama_perusahaan, pp.lokasi, pp.bidang, pp.no_telepon,
                pp.deskripsi_budaya, pp.logo
            FROM lowongan l
            LEFT JOIN profil_perusahaan pp ON l.id_perusahaan = pp.id_user
            WHERE l.id_lowongan = ?`, [id]
        );
        res.json({ data: rows[0] });
    } catch (err) { next(err); }
};

exports.store = async (req, res, next) => {
    try {
        res.status(201).json({ message: "Berhasil menambahkan lowongan" });
    } catch (err) { next(err); }
};