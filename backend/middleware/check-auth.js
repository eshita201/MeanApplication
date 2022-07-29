const jwt = require("jsonwebtoken");
const dotenv =require('dotenv')
dotenv.config({path : 'config.env'})


module.exports = (req,res,next)=>{

    try{
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken= jwt.verify(token, process.env.JWT_TOKEN);
    req.userData = {email: decodeToken.email,
    userid: decodeToken.userid};
    next();
    } catch (error){
        res.status(401).json({
            message: "Auth failed lalala!"
        });
    }
};