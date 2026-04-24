// Menangani semua error yang dilempar menggunakan next(err)
const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    status: statusCode === 500 ? "error" : "fail",
    message: err.message || "Terjadi kesalahan pada server",
    // Sesuai materi: sembunyikan stack trace di produksi
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorMiddleware;