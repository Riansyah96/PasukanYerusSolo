// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Ambil header authorization
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Auth Error: Header tidak ditemukan atau format salah");
        return res.status(401).json({ message: "User tidak terautentikasi" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Menyimpan data user ke req
        next();
    } catch (err) {
        console.log("Auth Error: Token tidak valid/kedaluwarsa", err.message);
        return res.status(401).json({ message: "Sesi Anda telah berakhir, silakan login kembali." });
    }
};

module.exports = auth;