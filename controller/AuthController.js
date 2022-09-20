import { repoGetByEmail, repoGetByToken, repoUpdateUser } from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async(req, res) => {
    try {
        const user = await repoGetByEmail(req.body.email);
        if(!user){
            return res.json({
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
        const roles = user.roles;
        const refreshToken = jwt.sign({userId, name, email, roles}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn : '1d'
        });
        const accessToken = jwt.sign({userId, name, email, roles}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '30s'
        });
        await repoUpdateUser({refresh_token : refreshToken}, userId);
        res.cookie('refreshToken',refreshToken, {
            httpOnly: true,
            sameSite: false,
            secure: true,
            maxAge : 24 * 60 * 60 * 1000
        });
        return res.json({
            data : {
                user_id : userId,
                name : name,
                email : email,
                role : roles
            },
            token : accessToken,
            is_error : false,
        });
    } catch(err) {
        return res.status(200).json({
            is_error : true,
            message : err
        });
    }
}

export const logout = async(req, res) => {
    if(!req.cookies.refreshToken){
        return res.json({
            message : "Bearer token kosong",
            is_error : true
        })
    }
    const refreshToken = req.cookies.refreshToken;
    const user = await repoGetByToken(refreshToken);
    if(!user){
        return res.json({
            message : "User not found",
            is_error : true
        });
    };
    await repoUpdateUser({ token : null }, user.id);
    res.clearCookie('refreshToken');
    return res.json({
       message : "Logout berhasil",
       is_error : false
    });
}

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.json({
            message : 'Bearer token kosong',
            is_error : true           
        });
        const user = await repoGetByToken(refreshToken);
        if(!user){
            return res.json({
                message : 'Error has occured',
                is_error : true
            });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err){
                return res.json({
                    message : err,
                    is_error : true
                });
            }
            const userId = user.id;
            const name = user.name;
            const email = user.email;
            const roles = user.roles;
            const accessToken = jwt.sign({userId, name, email, roles}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({
                data : {
                    access_token : accessToken
                },
                is_error : false
            });
        });
    } catch (error) {
        console.log(error);
    }
}