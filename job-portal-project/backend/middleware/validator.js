const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "fail", errors: errors.array() });
    }
    next();
};

module.exports = {
    authValidation: [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
        validate
    ],
    jobValidation: [
        body('judul_posisi').notEmpty(),
        validate
    ],
    applyValidation: [
        body('id_lowongan').notEmpty(),
        validate
    ],
    companyValidation: [
        body('nama_perusahaan').notEmpty(),
        validate
    ]
};