const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // Format: timestamp-namaasli.ext
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Batas 2MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Format file harus Gambar (JPG/PNG) atau PDF!"));
    }
});

module.exports = upload;