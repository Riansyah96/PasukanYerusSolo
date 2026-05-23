const pool = require('../config/db');

class ApplyController {
  async submit(req, res, next) {
    try {
      const { id_lowongan, pesan_tambahan } = req.body;
      // Opsional: Cek apakah sudah pernah melamar
      const [existing] = await pool.query('SELECT * FROM lamaran WHERE id_user = ? AND id_lowongan = ?', [req.user.id, id_lowongan]);
      if (existing.length > 0) {
        const error = new Error("Anda sudah melamar di posisi ini");
        error.statusCode = 400;
        throw error;
      }

      await pool.query('INSERT INTO lamaran (id_user, id_lowongan, pesan_tambahan) VALUES (?, ?, ?)', [req.user.id, id_lowongan, pesan_tambahan]);
      res.status(201).json({ status: "success", message: "Lamaran terkirim" });
    } catch (err) { next(err); }
  }

  async saveFavorite(req, res, next) {
    try {
      const { id_lowongan } = req.body;
      await pool.query('INSERT INTO favorit (id_user, id_lowongan) VALUES (?, ?) ON DUPLICATE KEY UPDATE id_user=id_user', [req.user.id, id_lowongan]);
      res.json({ status: "success", message: "Tersimpan di favorit" });
    } catch (err) { next(err); }
  }
}
module.exports = new ApplyController();