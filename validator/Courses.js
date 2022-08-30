import { check, validationResult } from "express-validator";
import Courses from "../db/models/Courses.js";
import Organization from "../db/models/Organization.js";
import Users from "../db/models/Users.js";

export const validateCourse = [
    check('course_name')
    .notEmpty()
    .withMessage('Nama course tidak boleh kosong'),

    check('organization_code')
    .notEmpty()
    .withMessage('Organisasi tidak boleh kosong'),

    check('due_date')
    .isDate()
    .withMessage('Due date harus menggunakan tanggal yang valid'),

    check('created_by')
    .notEmpty()
    .withMessage('Creator tidak boleh kosong'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({
                message : errors.array(),
                is_error : true
            });
        }
        next();
    }
];

export const validateDataCourse = async(req, res, next) => {
    var checkOrganization, checkCreator, checkDueDates, checkCourse;
    if(req.path == "/course/org"){
        return next();
    }
    if(req.method == "POST" || req.method == "PUT"){
        checkOrganization = await Organization.count({
            where : {
                organization_code : req.body.organization_code
            }
        });
        checkCreator = await Users.count({
            where : {
                id : req.body.created_by
            }
        });
        if(checkOrganization == 0){
            return res.json({
                message : 'Organisasi tidak ada',
                is_error : true
            });
        }
        if(checkCreator == 0){
            return res.json({
                message : 'Creator tidak ditemukan',
                is_error : true
            });
        }
        if(req.body.due_date < new Date().toISOString().slice(0, 10)){
            return res.json({
                message : 'Tanggal due date harus lebih besar atau sama dari tanggal hari ini',
                is_error : true
            });
        } 
    }
    if(req.method == "PUT" || req.method == "DELETE" || req.method == "GET"){
        checkCourse = await Courses.count({
            where : {
                id : req.params.id
            }
        });
        if(checkCourse == 0){
            return res.json({
                message : 'Course tidak ditemukan',
                is_error : true
            });
        }
    }
    next();
}

