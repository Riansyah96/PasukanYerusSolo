const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Pastikan menggunakan exports.namaFungsi
exports.register = async (req, res, next) => {
  try {
    const { nama, email, password, role } = req.body;
    const [userExist] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (userExist.length > 0) {
      return res.status(400).json({ status: "fail", message: "Email sudah terdaftar" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      'INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)',
      [nama, email, hashedPassword, role]
    );

    return res.status(201).json({ status: "success", message: "Registrasi Berhasil" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (rows.length === 0) {
      return res.status(400).json({ status: "fail", message: "Email tidak terdaftar" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: "fail", message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user.id_user, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    return res.json({ status: "success", token });
  } catch (err) {
    next(err);
  }
};