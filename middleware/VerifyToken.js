import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    if(req.headers.authorization == null){
        return res.json({
            is_error : true,
            message : "Bearer token kosong"
        });
    }
    var token = req.headers.authorization;
    if(token == null){
        return res.sendStatus(401);
    }
    token = token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            return res.status(403).json({"message" : "Unauthorized"});
        }
        next();
    })
}