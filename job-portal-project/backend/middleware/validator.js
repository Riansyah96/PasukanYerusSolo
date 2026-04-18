const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "fail",
            errors: errors.array().map(err => ({ field: err.path, msg: err.msg }))
        });
    }
    next();
};

module.exports = {
    authValidation: [
        body('nama').notEmpty().withMessage('Nama wajib diisi'),
        body('email').isEmail().withMessage('Format email salah'),
        body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
        validate
    ],
    jobValidation: [
        body('judul_posisi').notEmpty().withMessage('Judul posisi wajib diisi'),
        body('gaji').isNumeric().withMessage('Gaji harus berupa angka'),
        validate
    ],
    applyValidation: [
        body('id_lowongan').notEmpty().withMessage('ID Lowongan diperlukan'),
        validate
    ],
    companyValidation: [
        body('nama_perusahaan').notEmpty().withMessage('Nama perusahaan wajib diisi'),
        validate
    ]
};