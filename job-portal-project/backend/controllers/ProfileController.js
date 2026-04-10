const pool = require('../config/db');

class ProfileController {
  // GET: Tampilkan profil user login
  async show(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM profil_pencari_kerja WHERE id_user = ?', [req.user.id]);
      if (rows.length === 0) return res.status(404).json({ msg: "Profil tidak ditemukan" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // POST: Buat atau update profil
  async upsert(req, res) {
    const { bio, pendidikan, pengalaman, keahlian } = req.body;
    try {
      await pool.query(
        `INSERT INTO profil_pencari_kerja (id_user, bio, pendidikan, pengalaman, keahlian) 
         VALUES (?, ?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE bio=?, pendidikan=?, pengalaman=?, keahlian=?`,
        [req.user.id, bio, pendidikan, pengalaman, keahlian, bio, pendidikan, pengalaman, keahlian]
      );
      res.json({ msg: "Profil berhasil diperbarui" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ProfileController();