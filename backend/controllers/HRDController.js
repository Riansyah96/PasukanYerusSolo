// controllers/HRDController.js
const pool = require('../config/db');

class HRDController {
  // Fitur 6: Buat Lowongan Baru (Iqbal)
  async createJob(req, res) {
    const { judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO lowongan (id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan) VALUES (?, ?, ?, ?, ?, ?)',
        [req.user.id, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan]
      );
      res.status(201).json({ msg: "Lowongan dipublikasikan", jobId: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Fitur 7: Update Status Seleksi (Iqbal)
  async updateStatus(req, res) {
    const { id_lamaran, status } = req.body; // status: 'Review', 'Interview', 'Lolos', 'Gagal'
    try {
      await pool.query(
        'UPDATE lamaran SET status = ? WHERE id_lamaran = ?',
        [status, id_lamaran]
      );
      res.json({ msg: `Status lamaran berhasil diubah menjadi ${status}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new HRDController();