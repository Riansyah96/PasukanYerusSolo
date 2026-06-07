// controllers/HRDController.js
const pool = require('../config/db');

class HRDController {
  async createJob(req, res, next) {
    try {
      const { judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan } = req.body;
      await pool.query(
        'INSERT INTO lowongan (id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan) VALUES (?, ?, ?, ?, ?, ?)',
        [req.user.id_user, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan]
      );
      res.status(201).json({ status: "success", message: "Lowongan dipublikasikan" });
    } catch (err) { 
      console.error('Create job error:', err);
      next(err); 
    }
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
    } catch (err) { 
      console.error('Update status error:', err);
      next(err); 
    }
  }

  async getMyJobs(req, res, next) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM lowongan WHERE id_perusahaan = ?', 
        [req.user.id_user]
      );
      res.json({ status: "success", data: rows });
    } catch (err) { 
      console.error('Get my jobs error:', err);
      next(err); 
    }
  }

  async getApplications(req, res, next) {
    try {
      const perusahaanId = req.user.id_user;
      
      const [rows] = await pool.query(
        `SELECT l.id_lamaran, l.id_lowongan, l.pesan_tambahan, l.status, l.tanggal_melamar,
                low.judul_posisi, low.kategori, low.tipe_pekerjaan, low.gaji,
                u.nama as nama_pelamar, u.email as email_pelamar, u.telepon
         FROM lamaran l
         JOIN lowongan low ON l.id_lowongan = low.id_lowongan
         JOIN users u ON l.id_user = u.id_user
         WHERE low.id_perusahaan = ?
         ORDER BY l.tanggal_melamar DESC`,
        [perusahaanId]
      );
      
      res.json(rows);
    } catch (err) {
      console.error('Get applications error:', err);
      next(err);
    }
  }
}

module.exports = new HRDController();