import { check, validationResult } from "express-validator";
import { Lessons, LessonsDetail } from "../db/models/relationship/LessonRelation.js";

export const validateLessonDetail = [
    check('lesson_id')
    .notEmpty()
    .withMessage('Lesson ID tidak boleh kosong'),

    check('lesson_content')
    .notEmpty()
    .withMessage('Lesson Content tidak boleh kosong')
    .isLength({ min : 10 })
    .withMessage('Lesson content minimal mengandung 10 karakter'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({
                message : errors.array(),
                is_error : true
            });
        };
        next();
    }
];

export const validateDataLessonDetail = async(req, res, next) =>{
    var checkLesson, checkLessonDetail;
    if(req.method == "POST" || req.method == "PUT"){
        checkLesson = await Lessons.count({
            where : {
                id : req.body.lesson_id
            }
        });
    }
    if(req.method == "PUT" || req.method == "DELETE"){
        checkLessonDetail = await LessonsDetail.count({
            where : {
                id : req.params.id
            }
        });
    }
    if(checkLesson == 0){
        return res.json({
            message : "Lesson tidak ditemukan",
            is_error : true
        });
    }
    if(checkLessonDetail == 0){
        return res.json({
            message : "Lesson content tidak ditemukan",
            is_error : true
        });
    }
    next();
}