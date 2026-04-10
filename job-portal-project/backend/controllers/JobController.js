const pool = require('../config/db');

class JobController {
  // READ: Menampilkan semua lowongan (Untuk halaman utama/eksplorasi)
  async index(req, res) {
    try {
      const jobs = await pool.query('SELECT * FROM lowongan ORDER BY tanggal_posting DESC');
      res.json({ message: "Berhasil mengambil data lowongan", data: jobs.rows });
    } catch (err) {
      res.status(500).json({ message: "Gagal mengambil data", error: err.message });
    }
  }

  // CREATE: Menambahkan lowongan baru (Untuk fitur HRD/Perusahaan)
  async store(req, res) {
    const { id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan } = req.body;
    try {
      const newJob = await pool.query(
        'INSERT INTO lowongan (id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id_perusahaan, judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan]
      );
      res.status(201).json({ message: "Lowongan berhasil dipublikasikan", data: newJob.rows[0] });
    } catch (err) {
      res.status(500).json({ message: "Gagal memposting lowongan", error: err.message });
    }
  }

  // UPDATE: Mengubah data lowongan yang sudah ada
  async update(req, res) {
    const { id } = req.params;
    const { judul_posisi, kategori, gaji, deskripsi_pekerjaan } = req.body;
    try {
      const updatedJob = await pool.query(
        'UPDATE lowongan SET judul_posisi = $1, kategori = $2, gaji = $3, deskripsi_pekerjaan = $4 WHERE id_lowongan = $5 RETURNING *',
        [judul_posisi, kategori, gaji, deskripsi_pekerjaan, id]
      );
      res.json({ message: "Lowongan berhasil diperbarui", data: updatedJob.rows[0] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // DELETE: Menghapus lowongan
  async destroy(req, res) {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM lowongan WHERE id_lowongan = $1', [id]);
      res.json({ message: `Lowongan dengan ID ${id} berhasil dihapus` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new JobController();