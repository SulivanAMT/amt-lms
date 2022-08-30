import { check, validationResult } from "express-validator";
import Organization from "../db/models/Organization.js";
import Position from "../db/models/Position.js";
import Roles from "../db/models/Roles.js";
import Users from "../db/models/Users.js";

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
    
    check('organization')
    .notEmpty()
    .withMessage('Organisasi belum di isi'),

    check('position')
    .notEmpty()
    .withMessage('Posisi / jabatan belum di isi'),

    check('roles').
    notEmpty().withMessage('Roles belum di isi'),

    check('status').
    notEmpty().withMessage('Status employee belum di isi'),
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

export const validateDataUser = async(req, res, next) => {
    var checkEmail, checkPosition, checkUser, checkRoles, checkOrganization, checkToken;
    if(req.method == "POST" || req.method == "PUT"){
        if(req.method == "POST"){
            var checkEmail = await Users.count({
                where : {
                    email : req.body.email
                }
            });
        }

        checkPosition = await Position.count({
            where : {
                position_code : req.body.position   
            }
        });

        checkRoles = await Roles.count({
            where : {
                roles : req.body.roles
            }
        });
        checkOrganization = await Organization.count({
            where : {
                organization_code : req.body.organization
            }
        })
    }
    if(req.method == "PUT" || req.method == "DELETE" || req.method == "GET"){
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
    var token = req.headers.authorization;
    checkToken = await Users.count({
        where : {
            token : token.replace('Bearer ', '')
        }
    }) 
    if(checkToken == 0){
        return res.json({
            is_error : true,
            message : 'Unauthorized'
        })
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
    if(checkPosition == 0){
        return res.json({
            is_error : true,
            message : 'Posisi / jabatan tidak ada'
        })
    }
    if(checkRoles == 0){
        return res.json({
            is_error : true,
            message : 'Roles tidak ada'
        })
    }
    if(checkOrganization == 0){
        return res.json({
            is_error : true,
            message : 'Organisasi tidak ada'
        })
    }
    next();
}