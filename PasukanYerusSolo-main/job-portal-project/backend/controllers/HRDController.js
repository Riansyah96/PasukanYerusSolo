// controllers/HRDController.js
const pool = require('../config/db');

class HRDController {
  // Fitur 6: Buat Lowongan Baru
  async createJob(req, res, next) {
    const { judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO lowongan (id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan) VALUES (?, ?, ?, ?, ?, ?)',
        [req.user.id, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan]
      );

      res.status(201).json({
        status: "success",
        message: "Lowongan berhasil dipublikasikan",
        jobId: result.insertId
      });
    } catch (err) {
      next(err); // Dilempar ke errorMiddleware
    }
  }

  // Fitur 7: Update Status Seleksi
  async updateStatus(req, res, next) {
    const { id_lamaran, status } = req.body;
    try {
      const [result] = await pool.query(
        'UPDATE lamaran SET status = ? WHERE id_lamaran = ?',
        [status, id_lamaran]
      );

      if (result.affectedRows === 0) {
        const error = new Error("Data lamaran tidak ditemukan");
        error.statusCode = 404;
        throw error;
      }

      res.json({ status: "success", message: `Status lamaran diubah menjadi ${status}` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new HRDController();