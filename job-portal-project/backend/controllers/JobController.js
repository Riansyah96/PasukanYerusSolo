const pool = require('../config/db');

class JobController {
  // FITUR 3: Eksplorasi Lowongan (Tugas Aby)
  async index(req, res, next) {
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

      const [rows] = await pool.query(sql, params);
      res.json({ 
        status: "success",
        count: rows.length,
        data: rows 
      });
    } catch (err) {
      next(err); 
    }
  }

  // FITUR 10: Moderasi & Kontrol (Tugas Aby)
  async moderateDelete(req, res, next) {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM lowongan WHERE id_lowongan = ?', [id]);
      
      if (result.affectedRows === 0) {
        const error = new Error("Lowongan tidak ditemukan atau sudah dihapus");
        error.statusCode = 404;
        throw error;
      }

      res.json({ status: "success", message: "Konten berhasil dimoderasi (dihapus)" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new JobController();