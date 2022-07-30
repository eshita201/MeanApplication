const express=require('express');
const app = express();
const path = require("path");
const bodyparser=require('body-parser');
const cors =require('cors');
const bodyParser = require('body-parser');
const Post = require('./model/post');
const { json } = require('body-parser');
const postRoutes =require("./routes/posts");
const userRoutes =require("./routes/user");
const mongoose = require('mongoose');
const dotenv =require('dotenv')
dotenv.config({path : 'config.env'})
const connectDb = async=> {
   const con =  mongoose.connect(process.env.MONGO_URI,err=>{
       if(err) throw err;
       console.log('Connection to post database is successful');
 
   });
}
connectDb();
app.use(bodyParser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));
//app.use( express.static(__dirname + '/dist'));
/*app.get("/",function(req,res){
 res.sendFile(path.join(__dirname + '/dist/index.html'))
})*/
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
//app.use(cors());
app.use("/api/posts",postRoutes);
app.use("/api/users",userRoutes);
module.exports = app;


