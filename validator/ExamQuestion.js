import { check, validationResult } from "express-validator";

const validateExamQuestion = [
    check('exam_id')
    .notEmpty()
    .withMessage('Exam ID tidak boleh kosong')
    .escape(),

    check('name_of_question')
    .notEmpty()
    .withMessage('Pertanyaan soal tidak boleh kosong')
    .escape(),

    check('answer_of_question')
    .notEmpty()
    .withMessage('Jawaban tidak boleh kosong')
    .escape(),

    check('question_number')
    .notEmpty()
    .withMessage('Nomor pertanyaan tidak boleh kosong')
    .isInt()
    .withMessage('Nomor pertanyaan harus angka')
    .escape(),

    check('question_type')
    .notEmpty()
    .withMessage('Tipe soal tidak boleh kosong')
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
]

export default validateExamQuestion;