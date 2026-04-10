const pool = require('../config/db');

class JobController {
  async index(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM lowongan ORDER BY tanggal_posting DESC');
      res.json({ data: rows });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async store(req, res) {
    const { id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO lowongan (id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan) VALUES (?, ?, ?, ?, ?, ?)',
        [id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan]
      );
      res.status(201).json({ msg: "Lowongan dibuat", jobId: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { judul_posisi, kategori, gaji, deskripsi_pekerjaan } = req.body;
    try {
      await pool.query(
        'UPDATE lowongan SET judul_posisi = ?, kategori = ?, gaji = ?, deskripsi_pekerjaan = ? WHERE id_lowongan = ?',
        [judul_posisi, kategori, gaji, deskripsi_pekerjaan, id]
      );
      res.json({ msg: "Lowongan diperbarui" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM lowongan WHERE id_lowongan = ?', [id]);
      res.json({ msg: "Lowongan dihapus" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new JobController();