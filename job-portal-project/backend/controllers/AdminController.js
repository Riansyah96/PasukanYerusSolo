// controllers/AdminController.js
const pool = require('../config/db');

class AdminController {
  // Dashboard Stats
  async getStats(req, res) {
    try {
      const [totalUsers] = await pool.query('SELECT COUNT(*) as total FROM users');
      const [totalCompanies] = await pool.query('SELECT COUNT(*) as total FROM users WHERE role = "Perusahaan"');
      const [totalJobSeekers] = await pool.query('SELECT COUNT(*) as total FROM users WHERE role = "Pelamar"');
      const [totalJobs] = await pool.query('SELECT COUNT(*) as total FROM lowongan');
      const [totalApplications] = await pool.query('SELECT COUNT(*) as total FROM lamaran');
      
      res.json({
        total_users: totalUsers[0].total,
        total_companies: totalCompanies[0].total,
        total_job_seekers: totalJobSeekers[0].total,
        total_jobs: totalJobs[0].total,
        total_applications: totalApplications[0].total
      });
    } catch (err) {
      console.error('Get stats error:', err);
      res.status(500).json({ message: 'Gagal mengambil statistik' });
    }
  }

  // GET all users
  async getAllUsers(req, res) {
    try {
      const [rows] = await pool.query(
        'SELECT id_user, nama, email, role, telepon, keahlian, tentang_saya, foto FROM users ORDER BY id_user DESC'
      );
      res.json(rows);
    } catch (err) {
      console.error('Get users error:', err);
      res.status(500).json({ message: 'Gagal mengambil data users' });
    }
  }

  // GET user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await pool.query(
        'SELECT id_user, nama, email, role, telepon, keahlian, tentang_saya, foto FROM users WHERE id_user = ?',
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error('Get user error:', err);
      res.status(500).json({ message: 'Gagal mengambil data user' });
    }
  }

  // UPDATE user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { nama, email, role, telepon, keahlian, tentang_saya } = req.body;
      
      await pool.query(
        'UPDATE users SET nama = ?, email = ?, role = ?, telepon = ?, keahlian = ?, tentang_saya = ? WHERE id_user = ?',
        [nama, email, role, telepon || '', keahlian || '', tentang_saya || '', id]
      );
      
      res.json({ message: 'User berhasil diperbarui' });
    } catch (err) {
      console.error('Update user error:', err);
      res.status(500).json({ message: 'Gagal memperbarui user' });
    }
  }

  // DELETE user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      
      // Hapus data terkait terlebih dahulu
      await pool.query('DELETE FROM favorit WHERE id_user = ?', [id]);
      await pool.query('DELETE FROM lamaran WHERE id_user = ?', [id]);
      await pool.query('DELETE FROM lowongan WHERE id_perusahaan = ?', [id]);
      await pool.query('DELETE FROM users WHERE id_user = ?', [id]);
      
      res.json({ message: 'User berhasil dihapus' });
    } catch (err) {
      console.error('Delete user error:', err);
      res.status(500).json({ message: 'Gagal menghapus user' });
    }
  }

  // GET all jobs
  async getAllJobs(req, res) {
    try {
      const [rows] = await pool.query(
        `SELECT l.*, u.nama as nama_perusahaan 
         FROM lowongan l 
         LEFT JOIN users u ON l.id_perusahaan = u.id_user 
         ORDER BY l.id_lowongan DESC`
      );
      res.json(rows);
    } catch (err) {
      console.error('Get jobs error:', err);
      res.status(500).json({ message: 'Gagal mengambil data lowongan' });
    }
  }

  // DELETE job
  async deleteJob(req, res) {
    try {
      const { id } = req.params;
      
      // Hapus lamaran terkait terlebih dahulu
      await pool.query('DELETE FROM lamaran WHERE id_lowongan = ?', [id]);
      await pool.query('DELETE FROM favorit WHERE id_lowongan = ?', [id]);
      await pool.query('DELETE FROM lowongan WHERE id_lowongan = ?', [id]);
      
      res.json({ message: 'Lowongan berhasil dihapus' });
    } catch (err) {
      console.error('Delete job error:', err);
      res.status(500).json({ message: 'Gagal menghapus lowongan' });
    }
  }

  // GET all applications
  async getAllApplications(req, res) {
    try {
      const [rows] = await pool.query(
        `SELECT l.id_lamaran, l.id_lowongan, l.pesan_tambahan, l.status, l.tanggal_melamar,
                low.judul_posisi, low.kategori, low.tipe_pekerjaan, low.gaji,
                pelamar.nama as nama_pelamar, pelamar.email as email_pelamar,
                perusahaan.nama as nama_perusahaan
         FROM lamaran l
         JOIN lowongan low ON l.id_lowongan = low.id_lowongan
         JOIN users pelamar ON l.id_user = pelamar.id_user
         LEFT JOIN users perusahaan ON low.id_perusahaan = perusahaan.id_user
         ORDER BY l.tanggal_melamar DESC`
      );
      res.json(rows);
    } catch (err) {
      console.error('Get applications error:', err);
      res.status(500).json({ message: 'Gagal mengambil data lamaran' });
    }
  }

  // UPDATE application status
  async updateApplicationStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const validStatus = ['Menunggu', 'Review', 'Interview', 'Lolos', 'Gagal'];
      if (!validStatus.includes(status)) {
        return res.status(400).json({ message: 'Status tidak valid' });
      }
      
      await pool.query('UPDATE lamaran SET status = ? WHERE id_lamaran = ?', [status, id]);
      res.json({ message: 'Status lamaran berhasil diperbarui' });
    } catch (err) {
      console.error('Update application status error:', err);
      res.status(500).json({ message: 'Gagal memperbarui status' });
    }
  }
}

module.exports = new AdminController();