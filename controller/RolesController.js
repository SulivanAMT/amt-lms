import { errMsg } from "../helper/Helper.js";
import { repoCreatePermission, repoDeletePermission, repoGetPermission, repoGetPermissionById, repoCheckPermission, repoUpdatePermission, repoGetModul, repoGetMenu } from "../repositories/RolesRepository.js";

export const createPermission = async(req, res) => {
    try {
        const data = {
            roles : req.body.roles,
            flag_id : req.body.id,
            permission : req.body.permission,
            type : req.body.type
        };
        const existPermission = await repoCheckPermission(data.roles, data.flag_id, data.type);
        if(existPermission.length > 0){
            return res.json({
                message : 'Gagal, permission yang sama sudah ditambahkan untuk role tersebut',
                is_error : true
            });
        }
        await repoCreatePermission(data);
        return res.json({
            message : 'Permission berhasil ditambahkan',
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const updatePermission = async(req, res) => {
    try {
        if(typeof req.body.permission == 'undefined'){
            return res.json({
                message : 'Error has ocured',
                is_error : false
            })
        }else {
            if(req.body.permission == ''){
                return res.json({
                    message : 'Permission tidak boleh kosong'
                })
            }
        }
        const data = {
            permission : req.body.permission,
        };
        await repoUpdatePermission(data, req.params.id);
        return res.json({
            message : 'Permission berhasil diupdate',
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const deletePermission = async(req, res) => {
    try {
        const deleted = await repoDeletePermission(req.params.id);
        return res.json({
            message : 'Permission berhasil dihapus',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const getPermissionById = async(req, res) =>{
    try {
        const permission = await repoGetPermissionById(req.params.id);
        return res.json({
            data : permission,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const getPermission  = async(req, res) => {
    try {
        const permission = await repoGetPermission();
        return res.json({
            data : permission,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const getModul = async(req, res) => {
    try {
        const modul = await repoGetModul();
        return res.json({
            data : modul,
            is_error : false  
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })   
    }
}

export const getMenu = async(req, res) => {
    try {
        const menu = await repoGetMenu();
        return res.json({
            data : menu,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}