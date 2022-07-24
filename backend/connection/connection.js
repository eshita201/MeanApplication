const mongoose = require('mongoose');
const dotenv =require('dotenv')
dotenv.config({path : 'config.env'})

const connectDb = async=> {
    const con =  mongoose.connect(process.env.MONGO_URI,err=>{
        if(err) throw err;
        console.log('Connection to post database is successful');
  
    });
}

module.exports = connectDb;