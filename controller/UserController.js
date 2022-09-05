import { repoUserById, repoGetUser, repoCreateUser, repoUpdateUser, repoDeleteUser } from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";

export const getUserById = async(req, res) => {
    try {
        const users = await repoUserById(req.params.id);
        res.json({
            data : users, 
            is_error : false
        });
    }catch(err){
        res.json({
            message : err,
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

export const addUser  = async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const data = {
            name : req.body.name,
            email : req.body.email,
            dept_code : req.body.dept_code,
            phone_number : req.body.phone_number,
            password :  hashPassword,
            status : req.body.status,
            position_code : req.body.position,
            organization : req.body.organization,
            roles : req.body.roles
        }
        await repoCreateUser(data);
        res.status(200).json({
            message : "User berhasil dicreate",
            is_error : false
        });
    } catch {
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

}

export const getPermissionByMenu = async(req, res) => {

}

export const getPosition = async(req, res) => {

}

export const getPositionById = async(req, res) => {

}

export const updatePosition = async(req, res) => {

}

export const deletePosition = async(req, res) => {

}

export const createPosition = async(req, res) => {

}

export const getOrganization = async(req, res) => {

}

export const getOrganizationById = async(req, res) => {

}

export const updateOrganization = async(req, res) => {
    
}

export const deleteOrganization = async(req, res) => {

}

export const createOrganization = async(req, res) => {

}