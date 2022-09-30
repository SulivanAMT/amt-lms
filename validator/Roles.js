import { check, validationResult } from "express-validator";

export const validatePermission = [
    check('roles')
    .notEmpty()
    .withMessage('Roles tidak boleh kosong'),

    check('id')
    .notEmpty()
    .withMessage('Modul / Menu tidak boleh kosong'),

    check('permission')
    .notEmpty()
    .withMessage('Permission tidak boleh kosong'),

    check('type')
    .notEmpty()
    .withMessage('Tipe permission tidak boleh kosong'),

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
];