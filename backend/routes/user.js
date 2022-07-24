const express= require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs")
const router = express.Router();
const jwt =require('jsonwebtoken');
const dotenv =require('dotenv')
dotenv.config({path : 'config.env'})
const checkAuth = require('../middleware/check-auth');
const user = require("../model/user");
 router.post("/signup",(req,res,next)=>{
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save().then(result=>{
            res.status(200).json({
                message: 'User created!',
                result: result
            });
        }).catch(err=>{
            res.status(500).json({
                error: err
            });
        });
    });
});

 router.post("/login",async(req,res,next)=>{
    console.log('reached here 30 ' , req.body);
    let fetchedUser;
    const email= req.body.email;
    const pass = req.body.password;
    const user = await User.findOne({email}).lean()
    if(user){
        console.log("Email exists");
        if(await bcrypt.compare(pass,user.password)){

            const token = jwt.sign({email:user.email,
                userid:user._id},
                process.env.JWT_TOKEN,
                {expiresIn: "1h" } 
            ); 
            console.log("token:= ", token);

            res.status(200).json({
                token: token,
                expiresIn: 3600
            });

        }else{
            return res.status(401).json({
                message: "Auth failed Password does not match"
            });
        }
    }else{
         return res.status(401).json({
                        message: "Auth failed"
                    });
        }
    });



module.exports = router;