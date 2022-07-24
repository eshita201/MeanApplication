const jwt = require("jsonwebtoken");
const dotenv =require('dotenv')
dotenv.config({path : 'config.env'})


module.exports = (req,res,next)=>{

    try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_TOKEN);
    next();
    } catch (error){
        res.status(401).json({
            message: "Auth failed lalala!"
        });
    }
};