// controllers/ApplyController.js
const pool = require('../config/db');

class ApplyController {
  // Fitur 4: Kirim Lamaran (Umar)
  async submit(req, res) {
    const { id_lowongan, pesan_tambahan } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO lamaran (id_user, id_lowongan, pesan_tambahan) VALUES (?, ?, ?)',
        [req.user.id, id_lowongan, pesan_tambahan]
      );
      res.status(201).json({ msg: "Lamaran berhasil terkirim!", applyId: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  
  // Fitur 5: Simpan Favorit (Umar)
  async saveFavorite(req, res) {
    const { id_lowongan } = req.body;
    try {
      await pool.query(
        'INSERT INTO favorit (id_user, id_lowongan) VALUES (?, ?) ON DUPLICATE KEY UPDATE id_user=id_user',
        [req.user.id, id_lowongan]
      );
      res.json({ msg: "Lowongan berhasil disimpan ke favorit" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ApplyController();