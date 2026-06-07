// controllers/applicationController.js
const pool = require('../config/db');

exports.applyJob = async (req, res, next) => {
    try {
        const { id_lowongan, pesan_tambahan } = req.body;
        const pelamar_id = req.user?.id_user;
        
        if (!pelamar_id) {
            return res.status(401).json({ message: 'User tidak terautentikasi' });
        }
        
        if (!id_lowongan) {
            return res.status(400).json({ message: 'ID Lowongan harus disertakan' });
        }
        
        if (!req.file) {
            return res.status(400).json({ message: 'File CV wajib diupload' });
        }
        
        const cv_file = req.file.filename;
        
        const [lowonganCheck] = await pool.query(
            'SELECT * FROM lowongan WHERE id_lowongan = ?',
            [id_lowongan]
        );
        
        if (lowonganCheck.length === 0) {
            return res.status(404).json({ message: 'Lowongan tidak ditemukan' });
        }
        
        const [existingLamaran] = await pool.query(
            'SELECT * FROM lamaran WHERE id_user = ? AND id_lowongan = ?',
            [pelamar_id, id_lowongan]
        );
        
        if (existingLamaran.length > 0) {
            return res.status(400).json({ message: 'Anda sudah pernah melamar ke lowongan ini' });
        }
        
        const [result] = await pool.query(
            "INSERT INTO lamaran (id_user, id_lowongan, pesan_tambahan, status) VALUES (?, ?, ?, 'Menunggu')",
            [pelamar_id, id_lowongan, pesan_tambahan || '']
        );
        
        res.status(201).json({ 
            status: "success", 
            message: "✅ Lamaran berhasil dikirim!",
            data: { id_lamaran: result.insertId }
        });
        
    } catch (err) { 
        console.error('Apply job error:', err);
        res.status(500).json({ message: 'Terjadi kesalahan server: ' + err.message });
    }
};

exports.addFavorite = async (req, res, next) => {
    try {
        const { id_lowongan } = req.body;
        await pool.query("INSERT INTO favorit (id_user, id_lowongan) VALUES (?, ?)", [req.user.id_user, id_lowongan]);
        res.json({ status: "success", message: "✨ Lowongan berhasil disimpan ke favorit!" });
    } catch (err) { 
        console.error('Add favorite error:', err);
        next(err); 
    }
};

exports.updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        console.log('=== UPDATE STATUS ===');
        console.log('ID Lamaran:', id);
        console.log('Status baru:', status);
        
        // Validasi status - pastikan sesuai dengan enum di database
        const validStatus = ['Menunggu', 'Review', 'Interview', 'Lolos', 'Gagal'];
        
        // Cek apakah status yang dikirim valid
        if (!validStatus.includes(status)) {
            console.log('Status tidak valid:', status);
            return res.status(400).json({ 
                message: 'Status tidak valid. Gunakan: ' + validStatus.join(', ') 
            });
        }
        
        // Update status
        const [result] = await pool.query(
            'UPDATE lamaran SET status = ? WHERE id_lamaran = ?',
            [status, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Lamaran tidak ditemukan' });
        }
        
        console.log('Status updated successfully. Affected rows:', result.affectedRows);
        res.json({ 
            status: "success", 
            message: "Status lamaran diperbarui menjadi " + status 
        });
    } catch (err) { 
        console.error('Update status error:', err);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.getUserApplications = async (req, res, next) => {
    try {
        const userId = req.user.id_user;
        
        const [rows] = await pool.query(
            `SELECT l.id_lamaran, l.id_lowongan, l.pesan_tambahan, l.status, l.tanggal_melamar,
                    low.judul_posisi, low.kategori, low.tipe_pekerjaan, low.gaji,
                    u.nama as nama_perusahaan
             FROM lamaran l
             JOIN lowongan low ON l.id_lowongan = low.id_lowongan
             LEFT JOIN users u ON low.id_perusahaan = u.id_user
             WHERE l.id_user = ?
             ORDER BY l.tanggal_melamar DESC`,
            [userId]
        );
        
        res.json(rows);
    } catch (err) { 
        console.error('Get applications error:', err);
        next(err); 
    }
};