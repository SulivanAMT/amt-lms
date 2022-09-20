import jwt from "jsonwebtoken";
import { repoGetByToken } from "../repositories/UserRepository.js";

export const verifyToken = (req, res, next) => {
    // var token = req.cookies.refreshToken;
    // if(token == ''){
    //     return res.json({
    //         is_error : true,
    //         message : "Token kosong"
    //     });
    // }
    // jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    //     if(err){
    //         return res.status(200).json({
    //             is_error : true,
    //             message : "Unauthorized"
    //         });
    //     }
    //     next();
    // });
    next();
}