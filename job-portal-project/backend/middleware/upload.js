const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // File masuk ke folder uploads
    },
    filename: (req, file, cb) => {
        // Rename file agar unik (timestamp + nama asli) untuk mencegah overwrite
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2000000 }, // Batas maksimal 2MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf/; // Membatasi format file aman
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) return cb(null, true);
        cb(new Error("Hanya diperbolehkan mengupload Gambar atau PDF!"));
    }
});

module.exports = upload;