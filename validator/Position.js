import { check, validationResult } from "express-validator"

export const validatePosition = [
    check('position_code')
    .notEmpty()
    .withMessage('Kode posisi tidak boleh kosong'),

    check('position_name')
    .notEmpty()
    .withMessage('Nama posisi tidak boleh kosong'),

    check('position_description')
    .notEmpty()
    .withMessage('Deskripsi posisi tidak boleh kosong'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.json({
                message : errors.array(),
                is_error : true
            });
        }
        next();
    }
]