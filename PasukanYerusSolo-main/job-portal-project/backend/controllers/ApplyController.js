const pool = require('../config/db');

class ApplyController {
  // Fitur 4: Kirim Lamaran
  async submit(req, res, next) {
    const { id_lowongan, pesan_tambahan } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO lamaran (id_user, id_lowongan, pesan_tambahan) VALUES (?, ?, ?)',
        [req.user.id, id_lowongan, pesan_tambahan]
      );
      
      res.status(201).json({ 
        status: "success", 
        message: "Lamaran berhasil terkirim", 
        applyId: result.insertId 
      });
    } catch (err) {
      // Menangani error jika id_lowongan tidak ditemukan (foreign key constraint)
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        err.message = "Lowongan tidak ditemukan";
        err.statusCode = 404;
      }
      next(err);
    }
  }

  // Fitur 5: Simpan Favorit
  async saveFavorite(req, res, next) {
    const { id_lowongan } = req.body;
    try {
      await pool.query(
        'INSERT INTO favorit (id_user, id_lowongan) VALUES (?, ?) ON DUPLICATE KEY UPDATE id_user=id_user',
        [req.user.id, id_lowongan]
      );
      res.json({ status: "success", message: "Lowongan disimpan ke favorit" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ApplyController();