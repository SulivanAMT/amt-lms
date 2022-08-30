import { repoGetByEmail, repoGetByToken, repoUpdateUser } from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async(req, res) => {
    try {
        const user = await repoGetByEmail(req.body.email);
        if(!user){
            res.json({
                message : "Email atau password salah",
                is_error : true,
            });
        }
        const checkMatchAccount = await bcrypt.compare(req.body.password, user.password);
        if(!checkMatchAccount) {
            return res.json({
                message : "Email atau password salah",
                is_error : true,
            });
        }
        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '1d'
        });
        await repoUpdateUser({token : accessToken}, userId);
        res.json({
            data : {
                user_id : userId,
                name : name,
                email : email
            },
            token : accessToken,
            is_error : false,
        });
    } catch(err) {
        res.status(200).json({
            is_error : true,
            message : err
        });
    }
}

export const logout = async(req, res) => {
    if(!req.headers.authorization){
        res.status(200).json({
            message : "Bearer token kosong",
            is_error : true
        })
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    const user = await repoGetByToken(accessToken);
    if(!user){
        res.status(404).json({
            message : "User not found",
            is_error : true
        });
    };
    await repoUpdateUser({ token : null }, user.id);
    res.status(200).json({
       message : "Logout berhasil",
       is_error : false
    });
}