const authorize = (role) => {
    return (req, res, next) => {
        // req.user didapat dari middleware auth sebelumnya
        if (req.user.role !== role) {
            return res.status(403).json({ 
                status: "fail", 
                message: `Akses ditolak, fitur ini hanya untuk ${role}` 
            });
        }
        next();
    };
};

module.exports = authorize;