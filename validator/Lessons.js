import { validationResult, check } from "express-validator";
import Courses from "../db/models/Courses.js";
import { Lessons } from "../db/models/relationship/LessonRelation.js";
import Users from "../db/models/Users.js";

export const validateLesson = [
    check('course_id')
    .notEmpty()
    .withMessage('Course ID tidak boleh kosong'),

    check('lesson_title')
    .notEmpty()
    .withMessage('Judul lesson tidak boleh kosong')
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

export const validateDataLesson = async(req, res, next) => {
    var checkCourse, checkCreator, checkLesson;
    if(req.path == "/lesson/course"){
        return next();
    }
    if(req.method == "POST"  || req.method == "PUT"){
        checkCourse = await Courses.count({
            where : {
                id : req.body.course_id
            }
        });
        checkCreator = await Users.count({
            where : {
                id : req.body.created_by
            }
        });
    }    
    if(req.method == "PUT" || req.method == "DELETE"){
        checkLesson = await Lessons.count({
            where : {
                id : req.params.id
            }
        });
    }
    if(checkCreator == 0){
        return res.json({
            message : 'Creator tidak ditemukan',
            is_error : true
        });
    }
    if(checkCourse == 0){
        return res.json({
            message : 'Course tidak ditemukan',
            is_error : true
        });
    }
    if(checkLesson == 0){
        return res.json({
            message : 'Lesson tidak ditemukan',
            is_error : true
        });
    }
    next();  
}