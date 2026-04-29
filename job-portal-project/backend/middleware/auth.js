const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({ status: "fail", message: "Akses ditolak, token tidak ditemukan " });
    }

    try {
        const token = bearer.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Menyimpan data id & role dari token ke object request [cite: 1]
        next();
    } catch (err) {
        return res.status(401).json({ status: "fail", message: "Token tidak valid atau kedaluwarsa " });
    }
};

module.exports = auth;