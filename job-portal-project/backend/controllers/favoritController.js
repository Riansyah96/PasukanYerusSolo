// controllers/favoritController.js
const db = require('../config/db');

exports.tambahFavorit = async (req, res) => {
    try {
        if (!req.user || !req.user.id_user) {
            return res.status(401).json({ message: 'User tidak terautentikasi' });
        }

        const id_user = req.user.id_user;
        const { id_lowongan } = req.body;

        if (!id_lowongan) {
            return res.status(400).json({ message: 'ID Lowongan harus disertakan' });
        }

        const [cek] = await db.query(
            'SELECT * FROM favorit WHERE id_user = ? AND id_lowongan = ?', 
            [id_user, id_lowongan]
        );
        
        if (cek.length > 0) {
            return res.status(400).json({ message: 'Lowongan ini sudah ada di daftar favorit Anda!' });
        }

        await db.query(
            'INSERT INTO favorit (id_user, id_lowongan) VALUES (?, ?)', 
            [id_user, id_lowongan]
        );
        
        return res.status(200).json({ message: 'Lowongan berhasil disimpan ke favorit!' });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Terjadi kesalahan server saat menyimpan favorit' });
    }
};

exports.getDaftarFavorit = async (req, res) => {
    try {
        if (!req.user || !req.user.id_user) {
            return res.status(401).json({ message: 'User tidak terautentikasi' });
        }
        
        const id_user = req.user.id_user;
        
        const [rows] = await db.query(
            `SELECT f.id_user, f.id_lowongan, 
                    l.judul_posisi, l.kategori, l.tipe_pekerjaan, 
                    l.gaji, l.deskripsi_pekerjaan 
             FROM favorit f 
             JOIN lowongan l ON f.id_lowongan = l.id_lowongan 
             WHERE f.id_user = ?`, 
            [id_user]
        );
        
        return res.status(200).json(rows);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Gagal mengambil data lowongan favorit' });
    }
};

exports.hapusFavorit = async (req, res) => {
    try {
        if (!req.user || !req.user.id_user) {
            return res.status(401).json({ message: 'User tidak terautentikasi' });
        }
        
        const id_user = req.user.id_user;
        const { id_lowongan } = req.params;

        if (!id_lowongan) {
            return res.status(400).json({ message: 'ID Lowongan harus disertakan' });
        }

        const [result] = await db.query(
            'DELETE FROM favorit WHERE id_user = ? AND id_lowongan = ?', 
            [id_user, id_lowongan]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Favorit tidak ditemukan' });
        }

        return res.status(200).json({ message: 'Lowongan berhasil dihapus dari favorit!' });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Terjadi kesalahan server saat menghapus favorit' });
    }
};

exports.cekFavorit = async (req, res) => {
    try {
        if (!req.user || !req.user.id_user) {
            return res.status(200).json({ isFavorited: false });
        }

        const id_user = req.user.id_user;
        const { id_lowongan } = req.params;

        if (!id_lowongan) {
            return res.status(400).json({ message: 'ID Lowongan harus disertakan', isFavorited: false });
        }

        const [rows] = await db.query(
            'SELECT * FROM favorit WHERE id_user = ? AND id_lowongan = ?',
            [id_user, id_lowongan]
        );

        const isFavorited = rows.length > 0;
        
        return res.status(200).json({ isFavorited });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Gagal mengecek status favorit', isFavorited: false });
    }
};