const pool = require('../config/db');

class HRDController {
    async createJob(req, res, next) {
        try {
            const { judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan } = req.body;
            await pool.query(
                'INSERT INTO lowongan (id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan) VALUES (?, ?, ?, ?, ?, ?)',
                [req.user.id, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan]
            );
            res.status(201).json({ status: "success", message: "Lowongan berhasil dibuat" });
        } catch (err) { next(err); }
    }

    async updateStatus(req, res, next) {
        try {
            const { id_lamaran, status } = req.body;
            await pool.query('UPDATE lamaran SET status = ? WHERE id_lamaran = ?', [status, id_lamaran]);
            res.json({ status: "success", message: "Status diperbarui" });
        } catch (err) { next(err); }
    }
}
module.exports = new HRDController();