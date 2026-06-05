// controllers/HRDController.js
const pool = require('../config/db');

class HRDController {
  async createJob(req, res, next) {
    try {
      const { judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan } = req.body;
      await pool.query(
        'INSERT INTO lowongan (id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan) VALUES (?, ?, ?, ?, ?, ?)',
        [req.user.id, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan]
      );
      res.status(201).json({ status: "success", message: "Lowongan dipublikasikan" });
    } catch (err) { next(err); }
  }

  async updateStatus(req, res, next) {
    try {
      const { id_lamaran, status } = req.body;
      const [result] = await pool.query('UPDATE lamaran SET status = ? WHERE id_lamaran = ?', [status, id_lamaran]);
      if (result.affectedRows === 0) {
        const error = new Error("Data lamaran tidak ditemukan");
        error.statusCode = 404;
        throw error;
      }
      res.json({ status: "success", message: "Status seleksi diperbarui" });
    } catch (err) { next(err); }
  }

  async getMyJobs(req, res, next) {
    try {
      // Penting: Hanya ambil lowongan milik perusahaan yang sedang login
      const [rows] = await pool.query(
        'SELECT * FROM lowongan WHERE id_perusahaan = ?', 
        [req.user.id]
      );
      res.json({ status: "success", data: rows });
    } catch (err) { next(err); }
  }
} // <--- Kurung kurawal penutup kelas sekarang ada di sini

module.exports = new HRDController();