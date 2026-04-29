const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({ status: "fail", message: "Token tidak ada, akses ditolak" });
    }

    try {
        const token = bearer.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Menyimpan data user (id & role) ke request
        next();
    } catch (err) {
        return res.status(401).json({ status: "fail", message: "Token tidak valid" });
    }
};

module.exports = auth;