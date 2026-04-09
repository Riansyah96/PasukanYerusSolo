const pool = require('../config/db');

class JobController {
  // Menampilkan semua lowongan
  async index(req, res) {
    try {
      const jobs = await pool.query('SELECT * FROM lowongan ORDER BY tanggal_posting DESC');
      res.json({ data: jobs.rows });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Menambah lowongan baru
  async store(req, res) {
    const { id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan } = req.body;
    try {
      const newJob = await pool.query(
        'INSERT INTO lowongan (id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan]
      );
      res.status(201).json({ msg: "Lowongan berhasil diposting", data: newJob.rows[0] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new JobController();