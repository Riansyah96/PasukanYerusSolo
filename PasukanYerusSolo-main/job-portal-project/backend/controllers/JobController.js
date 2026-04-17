// controllers/JobController.js
const pool = require('../config/db');

class JobController {
  // FITUR 3: Eksplorasi Lowongan (Tugas Aby)
  async index(req, res) {
    const { search, kategori } = req.query;
    try {
      let sql = 'SELECT * FROM lowongan WHERE 1=1';
      let params = [];

      if (search) {
        sql += ' AND (judul_posisi LIKE ? OR deskripsi_pekerjaan LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }

      if (kategori) {
        sql += ' AND kategori = ?';
        params.push(kategori);
      }

      sql += ' ORDER BY tanggal_posting DESC';
      
      const [rows] = await pool.query(sql, params);
      res.json({ 
        message: "Berhasil mengambil data lowongan", 
        count: rows.length,
        data: rows 
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // FITUR 10: Moderasi & Kontrol (Tugas Aby)
  async moderateDelete(req, res) {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM lowongan WHERE id_lowongan = ?', [id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Lowongan tidak ditemukan" });
      }

      res.json({ msg: "Konten telah dimoderasi dan berhasil dihapus oleh Admin" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new JobController();