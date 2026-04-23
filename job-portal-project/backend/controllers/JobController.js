// controllers/JobController.js
const pool = require('../config/db');

class JobController {
  /**
   * FITUR 3: Eksplorasi Lowongan (Tugas Aby)
   * Mengambil data lowongan dengan filter search dan kategori
   */
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

      // Tambahkan pengurutan agar lowongan terbaru di atas
      sql += ' ORDER BY tanggal_posting DESC';

      const [rows] = await pool.query(sql, params);

      res.json({
        status: "success",
        message: "Berhasil mengambil data lowongan",
        count: rows.length,
        data: rows
      });
    } catch (err) {
      // Melempar error ke middleware global error handler
      next(err);
    }
  }

  /**
   * FITUR 10: Moderasi & Kontrol (Tugas Aby)
   * Menghapus lowongan berdasarkan ID (Akses khusus Admin/Superadmin)
   */
  async moderateDelete(req, res, next) {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM lowongan WHERE id_lowongan = ?', [id]);

      if (result.affectedRows === 0) {
        const error = new Error("Lowongan tidak ditemukan atau sudah dihapus");
        error.statusCode = 404;
        throw error;
      }

      res.json({
        status: "success",
        message: "Konten telah dimoderasi dan berhasil dihapus oleh Admin"
      });
    } catch (err) {
      next(err);
    }
  }
}

// Export satu kali saja di akhir file
module.exports = new JobController();