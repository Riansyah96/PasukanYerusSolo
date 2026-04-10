const pool = require('../config/db');

class ApplyController {
  // POST: Kirim lamaran
  async submit(req, res) {
    const { id_lowongan, pesan_tambahan } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO lamaran (id_user, id_lowongan, pesan_tambahan) VALUES (?, ?, ?)',
        [req.user.id, id_lowongan, pesan_tambahan]
      );
      res.status(201).json({ msg: "Berhasil melamar", applyId: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // GET: Lihat daftar lamaran saya
  async myApplications(req, res) {
    try {
      const [rows] = await pool.query(
        `SELECT l.*, lw.judul_posisi FROM lamaran l 
         JOIN lowongan lw ON l.id_lowongan = lw.id_lowongan 
         WHERE l.id_user = ?`,
        [req.user.id]
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ApplyController();