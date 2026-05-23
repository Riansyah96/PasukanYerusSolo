const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            status: "fail", 
            message: "Akses ditolak, token tidak ditemukan" 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Menyimpan data id_user dan role ke req.user
        next();
    } catch (err) {
        return res.status(401).json({ 
            status: "fail", 
            message: "Token tidak valid atau telah kedaluwarsa" 
        });
    }
};

module.exports = auth;