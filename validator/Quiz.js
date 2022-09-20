import { validationResult, check } from "express-validator";

export const validateQuiz = [
    check('title')
    .notEmpty()
    .withMessage('Title tidak boleh kosong')
    .escape(),

    check('course_id')
    .notEmpty()
    .withMessage('Course tidak boleh kosong')
    .escape(),

    check('quiz_time')
    .notEmpty()
    .withMessage('Waktu kuis tidak boleh kosong')
    .isInt({ min : 5, max : 300 })
    .withMessage('Waktu kuis minimal 5 menit dan maksimal 300 menit')
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
            })
        }
        next();
    }
];