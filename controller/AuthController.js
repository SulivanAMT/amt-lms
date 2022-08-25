import Users from "../db/models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async(req, res) => {
    try {
        const user = await Users.findOne({ where : { email : req.body.email } });
        const checkMatchAccount = await bcrypt.compare(req.body.password, user.password);
        if(!checkMatchAccount) {
            return res.status(200).json({
                is_error : true,
                message : "Email atau password salah"
            });
        }
        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '1d'
        });
        await Users.update({ token : accessToken }, { where : { id : userId } });
        res.json({
            is_error : false,
            data : {
                user_id : userId,
                name : name,
                email : email
            },
            token : accessToken
        });
    } catch(err) {
        res.status(200).json({
            is_error : true,
            message : "Email atau password salah"
        });
    }
}

export const logout = async(req, res) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    if(!accessToken){
        res.status(200).json({
            is_error : true,
            message : "Token doesn't valid"
        })
    }
    const user = await Users.findOne({ where : { token : accessToken } });
    if(!user){
        res.status(404).json({
            is_error : true,
            message : "User not found"
        });
    };
    await Users.update({ token : null }, { where : { id : user.id } });
    res.clearCookie('accessToken');
    res.status(200).json({
       is_error : false,
       message : "Logout berhasil" 
    });
}