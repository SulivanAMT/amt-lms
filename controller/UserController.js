import Users from "../db/models/Users.js";
import bcrypt from "bcrypt";

export const getUserById = async(req, res) => {
    try {
        const users = await Users.findByPk(req.params.id, {
            attributes : ['id', 'name','email', 'dept_code','createdAt', 'updatedAt']
        });
        res.json({
            is_error : false,
            data : users
        })
    }catch(err){
        res.json({
            is_error : true,
            message : err
        });
    }
}

export const getUser = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes : ['id', 'name','email', 'dept_code','createdAt', 'updatedAt']
        });
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
        await Users.create({
            name : req.body.name,
            email : req.body.email,
            dept_code : req.body.dept_code,
            phone_number : req.body.phone_number,
            password :  hashPassword
        });
        res.status(200).json({
            is_error : false,
            message : "User berhasil dicreate"
        });
    } catch {
        res.status(200).json({
            is_error : true,
            message : err
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
        };
        if(req.body.password != null){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const updatePassword = {
                password : hashPassword
            }
            updatedData = Object.assign(updatedData, updatePassword);  
        }
        await Users.update(updatedData, {
            where : {
                id : req.params.id
            }
        })
        res.json({
            is_error : false,
            message : "User berhasil di update!"
        });
    } catch(err){
        res.json({
            is_error : true,
            message : err
        });
    }
}

export const deleteUser = async(req, res) => {
    try {
        await Users.destroy({
            where : {
                id : req.params.id
            }
        });
        res.json({
            is_error : false,
            message : "User berhasil di hapus!"
        });
    } catch(err){
        res.json({
            is_error : true,
            message : err
        });
    }
}