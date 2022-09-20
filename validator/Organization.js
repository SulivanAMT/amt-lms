import { check, validationResult } from "express-validator";
import { Op } from "sequelize";
import Organization from "../db/models/Organization.js";

export const validateOrganization = [
    check('organization_code')
    .notEmpty()
    .withMessage('Kode organisasi tidak boleh kosong')
    .isLength({ min : 2, max : 3 })
    .withMessage('Kode organisasi minimal mengandung 2 karakter dan maksimal 3 karakter')
    .escape(),

    check('organization_name')
    .notEmpty()
    .withMessage('Nama organisasi tidak boleh kosong')
    .isLength({ max : 50 })
    .withMessage('Nama organisasi maksimal 50 karakter')
    .escape(),
    
    check('organization_code_head')
    .notEmpty()
    .withMessage('Kode kepala organisasi tidak boleh kosong')
    .escape(),

    check('organization_type')
    .notEmpty()
    .withMessage('Tipe organisasi tidak boleh kosong')
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

export const validateDataOrganization = async(req, res, next) => {
    var checkOrgCode, checkOrgName, checkOrgHead, checkOrgCodeParam;
    if(req.method == "POST" || req.method == "PUT") {
        let whereOrgCode = {
            organization_code : {
                [Op.eq] : req.body.organization_code
            }
        };
        let whereOrgName = {
            organization_name : req.body.organization_name
        }
        let whereOrgHead=  {
            organization_code : req.body.organization_code_head
        }
        if(req.method == "PUT"){
            Object.assign(whereOrgCode.organization_code, {
                [Op.ne] : req.params.code
            });
            Object.assign(whereOrgName, {
                organization_code : {
                    [Op.ne] : req.body.organization_code
                }
            });
            // Object.assign(whereOrgHead, {
            //     organization_code : {
            //         [Op.ne] : req.body.organization_code
            //     }
            // }); di offkan, salah query
        }
        checkOrgCode = await Organization.count({
            where : whereOrgCode
        });
        checkOrgName = await Organization.count({
            where : whereOrgName
        });
        checkOrgHead = await Organization.count({
            where : whereOrgHead
        })
    }
    if(req.method == "PUT" || req.method == "DELETE"){
        checkOrgCodeParam = await Organization.count({
            where : {
                organization_code : req.params.code
            }
        })
    }
    if(checkOrgCode > 0){
        return res.json({
            message : 'Kode organisasi sudah ada',
            is_error : true
        });
    }
    else if(checkOrgName > 0) {
        return res.json({
            message : 'Nama organisasi sudah ada',
            is_error : true
        });
    }
    else if(checkOrgHead == 0){
        return res.json({
            message : 'Kepala organisasi tidak ada',
            is_error : true
        });
    }
    else if(checkOrgCodeParam == 0) {
        return res.json({
            message : 'Kode organisasi tidak ditemukan',
            is_error : true
        });
    }
    next();
}