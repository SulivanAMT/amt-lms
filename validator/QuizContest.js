import { check, validationResult } from "express-validator";

const validateQuizContest = [
    check('title')
    .notEmpty()
    .withMessage('Judul kuis tidak boleh kosong')
    .escape(),

    check('description')
    .notEmpty()
    .withMessage('Deskripsi tidak boleh kosong')
    .isLength({ min : 5, max : 255 })
    .withMessage('Deskripsi minimal panjangnya 5 karakter dan maksimalnya 255 karakter')
    .escape(),

    check('quiz_time')
    .notEmpty()
    .withMessage('Waktu tidak boleh kosong')
    .isInt({ min : 5, max : 300 })
    .withMessage('Waktu kuis minimal 5 menit dan maksimal 300 menit')
    .escape(),

    check('due_date') 
    .notEmpty()
    .withMessage('Tanggal due date tidak boleh kosong')
    .isDate()
    .withMessage('Tanggal due date harus valid')
    .escape(),

    check('number_of_question')
    .notEmpty()
    .withMessage('Jumlah soal tidak boleh kosong')
    .isInt({ min : 1, max : 30 })
    .withMessage('Jumlah soal minimal 1 dan maksimal adalah 30')
    .escape(),

    check('created_by')
    .notEmpty()
    .withMessage('Created by tidak boleh kosong')
    .escape(),

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

export default validateQuizContest;