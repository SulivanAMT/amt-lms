import Exams from "../db/models/Exams.js";
import { validationResult, check } from "express-validator";

export const validateExam = [
    check('title')
    .notEmpty()
    .withMessage('Judul ujian tidak boleh kosong')
    .escape(),

    check('course_id')
    .notEmpty()
    .withMessage('Course tidak boleh kosong')
    .escape(),

    check('description')
    .notEmpty()
    .withMessage('Deskripsi tidak boleh kosong')
    .escape(),

    check('exam_time')
    .notEmpty()
    .withMessage('Waktu ujian tidak boleh kosong')
    .isInt({ min : 10, max : 300 })
    .withMessage('Waktu ujian minimal 10 menit dan maksimal 300 menit')
    .escape(),

    check('number_of_question')
    .notEmpty()
    .withMessage('Number of question tidak boleh kosong')
    .isInt({ min : 1, max : 100 })
    .withMessage('Jumlah soal minimal 1 dan maksimal 100')
    .escape(),

    check('created_by')
    .notEmpty()
    .withMessage('Created by tidak boleh kosong')
    .escape(),

    check('passing_grade')
    .notEmpty()
    .withMessage('Created by tidak boleh kosong')
    .isInt({ min : 50, max : 100 })
    .withMessage('Passing grade minimal 50 dan maksimal 100 point')
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