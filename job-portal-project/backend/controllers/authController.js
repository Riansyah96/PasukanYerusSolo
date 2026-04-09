const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fitur Registrasi (Role Based)
exports.register = async (req, res) => {
  const { nama, email, password, role } = req.body;
  try {
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) return res.status(400).json({ msg: "Email sudah terdaftar" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (nama, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id_user, nama, role',
      [nama, email, hashedPassword, role]
    );

    res.status(201).json({ msg: "Registrasi Berhasil", user: newUser.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fitur Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).json({ msg: "Email tidak terdaftar" });

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) return res.status(400).json({ msg: "Password salah" });

    const payload = { user: { id: user.rows[0].id_user, role: user.rows[0].role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.rows[0].role, nama: user.rows[0].nama });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};