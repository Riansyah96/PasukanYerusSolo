const db = require('../config/db'); // Sesuaikan dengan konfigurasi koneksi database kamu

// 1. Menyimpan lowongan ke favorit
exports.tambahFavorit = async (req, res) => {
    try {
        const id_user = req.user.id; // Diambil dari middleware otentikasi JWT kamu
        const { id_lowongan } = req.body;

        if (!id_lowongan) {
            return res.status(400).json({ message: 'ID Lowongan harus disertakan' });
        }

        // Cek apakah sudah pernah difavoritkan sebelumnya
        const [cek] = await db.query('SELECT * FROM favorit WHERE id_user = ? AND id_lowongan = ?', [id_user, id_lowongan]);
        if (cek.length > 0) {
            return res.status(400).json({ message: 'Lowongan ini sudah ada di daftar favorit Anda!' });
        }

        // Masukkan ke database
        await db.query('INSERT INTO favorit (id_user, id_lowongan) VALUES (?, ?)', [id_user, id_lowongan]);
        
        return res.status(200).json({ message: 'Lowongan berhasil disimpan ke favorit!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server saat menyimpan favorit' });
    }
};

// 2. Mengambil daftar lowongan yang difavoritkan oleh user tersebut
exports.getDaftarFavorit = async (req, res) => {
    try {
        const id_user = req.user.id;

        // Query JOIN untuk mengambil detail lowongan yang difavoritkan
        const [rows] = await db.query(
            `SELECT f.id AS id_favorit, l.* 
             FROM favorit f 
             JOIN lowongan l ON f.id_lowongan = l.id 
             WHERE f.id_user = ?`, 
            [id_user]
        );

        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Gagal mengambil data lowongan favorit' });
    }
};