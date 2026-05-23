const pool = require('../config/db');

// --- EKSPLORASI & DETAIL (Tugas Aby) ---
exports.getAllJobs = async (req, res, next) => {
    try {
        const { keyword, lokasi, kategori } = req.query;
        let query = "SELECT * FROM lowongan WHERE 1=1"; 
        let params = [];

        if (keyword) {
            query += " AND (judul_posisi LIKE ? OR deskripsi_pekerjaan LIKE ?)";
            params.push(`%${keyword}%`, `%${keyword}%`);
        }
        if (lokasi) { query += " AND lokasi = ?"; params.push(lokasi); }
        if (kategori) { query += " AND kategori = ?"; params.push(kategori); }

        const [rows] = await pool.query(query, params);
        res.json({ status: "success", data: rows });
    } catch (err) { next(err); }
};

// --- FUNGSI BARU: Detail Lowongan ---
exports.getJobDetail = async (req, res, next) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM lowongan WHERE id = ?", 
            [req.params.id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ status: "fail", message: "Lowongan tidak ditemukan" });
        }
        res.json({ status: "success", data: rows[0] });
    } catch (err) { next(err); }
};

// --- KELOLA LOWONGAN (Tugas Iqbal) ---
exports.createJob = async (req, res, next) => {
    try {
        const { judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan, lokasi } = req.body;
        await pool.query(
            "INSERT INTO lowongan (judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan, lokasi, perusahaan_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan, lokasi, req.user.id]
        );
        res.status(201).json({ status: "success", message: "Lowongan berhasil dipublikasikan" });
    } catch (err) { next(err); }
};

// --- DASHBOARD STATS (Tugas Syahid) ---
exports.getStats = async (req, res, next) => {
    try {
        const [userCount] = await pool.query("SELECT COUNT(*) as total FROM users");
        const [jobCount] = await pool.query("SELECT COUNT(*) as total FROM lowongan");
        const [appCount] = await pool.query(
            `SELECT COUNT(*) as total_lamaran, 
             SUM(CASE WHEN status = 'Lolos' THEN 1 ELSE 0 END) as total_lolos 
             FROM lamaran`
        );

        res.json({
            status: "success",
            data: {
                total_pengguna: userCount[0].total,
                total_lowongan: jobCount[0].total,
                total_lamaran: appCount[0].total_lamaran,
                total_lolos: appCount[0].total_lolos || 0
            }
        });
    } catch (err) { next(err); }
};