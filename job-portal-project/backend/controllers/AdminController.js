const pool = require('../config/db');

class AdminController {
    async updateCompany(req, res, next) {
        try {
            const { nama_perusahaan, deskripsi_budaya, lokasi } = req.body;
            await pool.query('UPDATE profil_perusahaan SET nama_perusahaan=?, deskripsi_budaya=?, lokasi=? WHERE id_user=?', 
            [nama_perusahaan, deskripsi_budaya, lokasi, req.user.id]);
            res.json({ status: "success", message: "Profil perusahaan diperbarui" });
        } catch (err) { next(err); }
    }

    async getStats(req, res, next) {
        try {
            const [u] = await pool.query('SELECT COUNT(*) as total FROM users');
            const [l] = await pool.query('SELECT COUNT(*) as total FROM lowongan');
            res.json({ status: "success", data: { total_user: u[0].total, total_job: l[0].total } });
        } catch (err) { next(err); }
    }
}
module.exports = new AdminController();