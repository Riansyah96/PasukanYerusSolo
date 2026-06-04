// backend/controllers/ApplyController.js
const pool = require('../config/db');

class ApplyController {
  async submit(req, res, next) {
    try {
      const { id_lowongan, pesan_tambahan } = req.body;
      const cv_file = req.file ? req.file.filename : null; // Ambil nama file dari middleware upload

      await pool.query(
        'INSERT INTO lamaran (id_user, id_lowongan, cv_path, pesan_tambahan, status) VALUES (?, ?, ?, ?, "Pending")', 
        [req.user.id, id_lowongan, cv_file, pesan_tambahan]
      );
      
      res.status(201).json({ status: "success", message: "Lamaran terkirim" });
    } catch (err) { next(err); }
  }
}
module.exports = new ApplyController();