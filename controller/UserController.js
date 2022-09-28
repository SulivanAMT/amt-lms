import { repoUserById, repoGetUser, repoCreateUser, repoUpdateUser, repoDeleteUser, repoGetRole, repoGetOrganization, repoGetOrganizationByCode, repoUpdateOrganization, repoDeleteOrganization, repoCreateOrganization, repoGetListRole, repoGetPosition, repoGetPositionByCode, repoDeletePosition, repoCreatePosition, repoUpdatePosition, repoGetUserByOrg, repoGetPermission, repoGetByToken } from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";
import { errMsg } from "../helper/Helper.js";

export const getUserById = async(req, res) => {
    try {
        const users = await repoUserById(req.params.id);
        const userToken = await repoGetByToken(req.cookies.refreshToken);
        if(userToken){
            if(userToken.id == req.params.id){
                res.json({
                    data : users, 
                    is_error : false
                });
            }else {
                res.json({
                    message : 'User tidak ada',
                    is_error : true
                });
            }
        }
    }catch(err){
        res.json({
            message : errMsg(err),
            is_error : true,
        });
    }
}

export const getUser = async(req, res) => {
    try {
        const users = await repoGetUser();
        res.status(200).json({
            data : users,
            is_error : false
        });
    } catch(err){
        res.status(500).json({
            message : err,
            is_error : true
        });
    }
}

export const getUserByOrg = async(req, res) => {
    try {
        const users = await repoGetUserByOrg(req.body.organization_code);
        res.status(200).json({
            data : users,
            is_error : false
        });
    } catch(err){
        res.status(500).json({
            message : err,
            is_error : true
        });
    }
}

export const addUser  = async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const data = {
            name : req.body.name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            password :  hashPassword,
            status : req.body.status,
            position_code : req.body.position,
            organization_code : req.body.organization,
            roles : req.body.roles
        }
        await repoCreateUser(data);
        res.status(200).json({
            message : "User berhasil dicreate",
            is_error : false
        });
    } catch(err) {
        res.status(200).json({
            message : err,
            is_error : true
        });
    }
}

export const updateUser = async(req, res) => {
    try {
        let updatedData = {
            name : req.body.name,
            email : req.body.email,
            dept_code : req.body.dept_code,
            phone_number : req.body.phone_number,
            position_code : req.body.position,
            organization : req.body.organization,
            roles : req.body.roles
        };
        if(req.body.password != null){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const updatePassword = {
                password : hashPassword
            }
            updatedData = Object.assign(updatedData, updatePassword);  
        }
        await repoUpdateUser(updatedData, req.params.id);
        res.json({
            message : "User berhasil di update!",
            is_error : false
        });
    } catch(err){
        res.json({
            message : err,
            is_error : true
        });
    }
}

export const deleteUser = async(req, res) => {
    try {
        await repoDeleteUser(req.params.id);
        res.json({
            message : "User berhasil di hapus!",
            is_error : false
        });
    } catch(err){
        res.json({
            message : err,
            is_error : true
        });
    }
}

export const getListOfMenu = async(req, res) => {
    try {
        const roles = req.body.roles;
        const getRoles = await repoGetRole(roles);
        if(!getRoles) {
            return res.json({
                message : 'Role tidak ditemukan',
                is_error : true
            });
        }
        return res.json({
            data : getRoles,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const getPermissionByMenu = async(req, res) => {
    try {
        const permission = await repoGetPermission(req.body.role, req.body.type, req.body.url);
        return res.json({
            data : permission,
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const getRoles = async(req, res) => {
    try {
        const role = await repoGetListRole();
        return res.json({
            data : role,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const getPosition = async(req, res) => {
    try {
        const position = await repoGetPosition();
        return res.json({
            data : position,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const getPositionByCode = async(req, res) => {
    try {
        const position = await repoGetPositionByCode(req.params.code);
        return res.json({
            data : position,
            is_error : false
        })
    } catch(err) {
        return res.json({
            message: errMsg(err),
            is_error : true
        });
    }
}

export const updatePosition = async(req, res) => {
    try {
        const data = {
            position_code : req.body.position_code,
            position_name : req.body.position_name,
            position_description : req.body.position_description
        };
        await repoUpdatePosition(data, req.params.code);
        return res.json({
            message : 'Posisi berhasil diubah',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const deletePosition = async(req, res) => {
    try {
        await repoDeletePosition(req.params.code);
        return res.json({
            message : 'Posisi berhasil dihapus',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const createPosition = async(req, res) => {
    try {
        const data = {
            position_code : req.body.position_code,
            position_name : req.body.position_name,
            position_description : req.body.position_description
        };
        await repoCreatePosition(data);
        return res.json({
            message : 'Posisi berhasil ditambah',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const getOrganization = async(req, res) => {
    try {
        const org = await repoGetOrganization();
        return res.json({
            data : org,
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : false
        });
    }
}

export const getOrganizationByCode = async(req, res) => {
    try {
        const org = await repoGetOrganizationByCode(req.params.code);
        return res.json({
            data : org,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const updateOrganization = async(req, res) => {
    try {
        const data = {
            organization_code : req.body.organization_code,
            organization_name : req.body.organization_name,
            organization_code_head : req.body.organization_code_head,
            organization_type : req.body.organization_type
        };
        await repoUpdateOrganization(data, req.params.code);
        return res.json({
            message : 'Organisasi berhasil diupdate',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const deleteOrganization = async(req, res) => {
    try {
        await repoDeleteOrganization(req.params.code);
        return res.json({
            message : 'Organisasi berhasil dihapus',
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const createOrganization = async(req, res) => {
    try {
        const data = {
            organization_code : req.body.organization_code,
            organization_name : req.body.organization_name,
            organization_code_head : req.body.organization_code_head,
            organization_type : req.body.organization_type
        };
        await repoCreateOrganization(data, req.params.code);
        return res.json({
            message : 'Organisasi berhasil ditambahkan',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

