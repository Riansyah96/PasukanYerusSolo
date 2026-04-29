const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: "fail",
                message: `Akses ditolak, peran ${req.user.role} tidak diizinkan mengakses fitur ini`
            });
        }
        next();
    };
};

module.exports = authorize;