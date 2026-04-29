const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pastikan folder 'uploads' sudah dibuat
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file agar unik
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2000000 }, // Batas 2MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype) return cb(null, true);
        cb(new Error("Format file harus Gambar atau PDF!"));
    }
});

module.exports = upload;