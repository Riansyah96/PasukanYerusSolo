const pool = require('../config/db');

class ApplyController {
    async submit(req, res, next) {
        try {
            const { id_lowongan, pesan_tambahan } = req.body;
            await pool.query('INSERT INTO lamaran (id_user, id_lowongan, pesan_tambahan) VALUES (?, ?, ?)', 
            [req.user.id, id_lowongan, pesan_tambahan]);
            res.status(201).json({ status: "success", message: "Lamaran terkirim" });
        } catch (err) { next(err); }
    }

    async saveFavorite(req, res, next) {
        try {
            const { id_lowongan } = req.body;
            await pool.query('INSERT INTO favorit (id_user, id_lowongan) VALUES (?, ?) ON DUPLICATE KEY UPDATE id_user=id_user', 
            [req.user.id, id_lowongan]);
            res.json({ status: "success", message: "Disimpan ke favorit" });
        } catch (err) { next(err); }
    }
}
module.exports = new ApplyController();