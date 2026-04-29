const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ 
                status: "fail", 
                message: `Akses ditolak, hanya untuk role: ${role}` 
            });
        }
        next();
    };
};

module.exports = authorize;