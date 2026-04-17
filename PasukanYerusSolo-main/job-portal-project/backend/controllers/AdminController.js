const pool = require('../config/db');

class AdminController {
  // Fitur 8: Update Profil Perusahaan
  async updateCompany(req, res, next) {
    const { nama_perusahaan, deskripsi_budaya, lokasi } = req.body;
    try {
      const [result] = await pool.query(
        'UPDATE profil_perusahaan SET nama_perusahaan = ?, deskripsi_budaya = ?, lokasi = ? WHERE id_user = ?',
        [nama_perusahaan, deskripsi_budaya, lokasi, req.user.id]
      );

      res.json({ status: "success", message: "Branding perusahaan berhasil diperbarui" });
    } catch (err) {
      next(err);
    }
  }

  // Fitur 9: Dashboard Statistik
  async getStats(req, res, next) {
    try {
      // Menggunakan Promise.all agar eksekusi query lebih cepat secara paralel
      const [
        [userCount], 
        [jobCount], 
        [applyCount]
      ] = await Promise.all([
        pool.query('SELECT COUNT(*) as total FROM users'),
        pool.query('SELECT COUNT(*) as total FROM lowongan'),
        pool.query('SELECT COUNT(*) as total FROM lamaran')
      ]);
      
      res.json({
        status: "success",
        data: {
          total_pengguna: userCount[0].total,
          total_lowongan: jobCount[0].total,
          total_lamaran: applyCount[0].total
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();