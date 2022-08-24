import { check, validationResult } from "express-validator";
import Users from "../db/models/users.js";

export const validateUser = [
    check('name').
    notEmpty().withMessage('Nama tidak boleh kosong'),

    check('email').
    isEmail().withMessage('Email tidak valid').
    notEmpty().withMessage('Email tidak boleh kosong'),

    check('password').
    isLength({ min : 5 }).
    optional().
    withMessage('Password minimal 5 karakter'),
    
    check('phone_number').
    isInt().withMessage('No hp harus mengandung angka').
    notEmpty().withMessage('No hp tidak boleh kosong'),
    
    check('dept_code').
    notEmpty().withMessage('Department belum di isi'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({
                is_error : true,
                message : errors.array()
            });
        }
        next();
    }
];

export const validateDataUser = async(req, res, next) => {
    if(req.method == "POST"){
        var checkEmail = await Users.count({
            where : {
                email : req.body.email
            }
        });
    }
    else if(req.method == "PUT" || req.method == "DELETE" || req.method == "GET"){
        if(req.method == "put"){
            checkEmail = await Users.count({
                where : {
                    email : req.body.email,
                    id : {
                        $not : req.params.id
                    }
                }
            });   
        }
        var checkUser = await Users.count({
            where : {
                id : req.params.id
            }
        });
    }        
    if(checkEmail > 0){
        return res.json({
             is_error : true,
             message : "Email sudah terdaftar"
         })
    }
    if(checkUser == 0){
        return res.json({
            is_error : true,
            message : 'User tidak ada'
        })
    }
    next();
}