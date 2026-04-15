// controllers/AdminController.js
const pool = require('../config/db');

class AdminController {
  // Fitur 8: Update Profil Perusahaan (Syahid)
  async updateCompany(req, res) {
    const { nama_perusahaan, deskripsi_budaya, lokasi } = req.body;
    try {
      await pool.query(
        'UPDATE profil_perusahaan SET nama_perusahaan = ?, deskripsi_budaya = ?, lokasi = ? WHERE id_user = ?',
        [nama_perusahaan, deskripsi_budaya, lokasi, req.user.id]
      );
      res.json({ msg: "Branding perusahaan diperbarui" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Fitur 9: Dashboard Statistik (Syahid)
  async getStats(req, res) {
    try {
      const [userCount] = await pool.query('SELECT COUNT(*) as total FROM users');
      const [jobCount] = await pool.query('SELECT COUNT(*) as total FROM lowongan');
      const [applyCount] = await pool.query('SELECT COUNT(*) as total FROM lamaran');
      
      res.json({
        total_pengguna: userCount[0].total,
        total_lowongan: jobCount[0].total,
        total_lamaran: applyCount[0].total
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new AdminController();