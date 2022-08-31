import { validationResult, check } from "express-validator";

export const validateQuiz = [
    check('title')
    .notEmpty()
    .withMessage('Title tidak boleh kosong'),

    check('course_id')
    .notEmpty()
    .withMessage('Course tidak boleh kosong'),

    check('quiz_time')
    .notEmpty()
    .withMessage('Exam time tidak boleh kosong'),

    check('number_of_question')
    .notEmpty()
    .withMessage('Number of question tidak boleh kosong'),

    check('created_by')
    .notEmpty()
    .withMessage('Created by tidak boleh kosong'),

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