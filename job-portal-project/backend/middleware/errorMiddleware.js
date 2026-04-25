const errorMiddleware = (err, req, res, next) => {
    console.error("Error Log:", err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: statusCode === 500 ? "error" : "fail",
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorMiddleware;