// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        if (!authHeader) {
            return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
        }
        
        const token = authHeader.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = {
            id_user: decoded.id,
            email: decoded.email,
            role: decoded.role,
            ...decoded
        };
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token tidak valid.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token telah kadaluarsa. Silakan login kembali.' });
        }
        res.status(401).json({ message: 'Token tidak valid atau telah kadaluarsa.' });
    }
};