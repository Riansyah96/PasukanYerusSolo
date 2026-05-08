const pool = require('../config/db');

exports.applyJob = async (req, res, next) => {
    try {
        const { id_lowongan, pesan_tambahan } = req.body;
        const pelamar_id = req.user.id;
        const cv_file = req.file ? req.file.filename : null;

        await pool.query(
            "INSERT INTO lamaran (id_lowongan, id_pelamar, cv_path, pesan_tambahan, status) VALUES (?, ?, ?, ?, 'Pending')",
            [id_lowongan, pelamar_id, cv_file, pesan_tambahan]
        );
        res.status(201).json({ status: "success", message: "Lamaran berhasil dikirim" });
    } catch (err) { next(err); }
};

exports.addFavorite = async (req, res, next) => {
    try {
        const { id_lowongan } = req.body;
        await pool.query("INSERT INTO favorit (id_user, id_lowongan) VALUES (?, ?)", [req.user.id, id_lowongan]);
        res.json({ status: "success", message: "Lowongan disimpan ke favorit" });
    } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 
        await pool.query("UPDATE lamaran SET status = ? WHERE id = ?", [status, id]);
        res.json({ status: "success", message: "Status lamaran diperbarui" });
    } catch (err) { next(err); }
};