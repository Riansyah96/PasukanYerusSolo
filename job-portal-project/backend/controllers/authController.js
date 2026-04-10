const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nama, email, password, role } = req.body;
  try {
    const [userExist] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (userExist.length > 0) return res.status(400).json({ msg: "Email sudah terdaftar" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      'INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)',
      [nama, email, hashedPassword, role]
    );

    res.status(201).json({ msg: "Registrasi Berhasil", userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(400).json({ msg: "Email tidak terdaftar" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Password salah" });

    const payload = { user: { id: user.id_user, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role, nama: user.nama });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};