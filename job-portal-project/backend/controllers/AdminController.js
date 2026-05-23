const pool = require('../config/db');

class AdminController {
  async updateCompany(req, res, next) {
    try {
      const { nama_perusahaan, deskripsi_budaya, lokasi } = req.body;
      await pool.query('UPDATE profil_perusahaan SET nama_perusahaan = ?, deskripsi_budaya = ?, lokasi = ? WHERE id_user = ?', [nama_perusahaan, deskripsi_budaya, lokasi, req.user.id]);
      res.json({ status: "success", message: "Branding perusahaan diperbarui" });
    } catch (err) { next(err); }
  }

  async getStats(req, res, next) {
    try {
      const [[u], [l], [a]] = await Promise.all([
        pool.query('SELECT COUNT(*) as total FROM users'),
        pool.query('SELECT COUNT(*) as total FROM lowongan'),
        pool.query('SELECT COUNT(*) as total FROM lamaran')
      ]);
      res.json({
        status: "success",
        data: { users: u[0].total, jobs: l[0].total, applications: a[0].total }
      });
    } catch (err) { next(err); }
  }
}
module.exports = new AdminController(); 