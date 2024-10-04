// connecting mongodb with node js
// 1.import mongoose

const mongoose=require('mongoose');
const mongoURL='mongodb://localhost:27017/hotelrecord'

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("The database is connected");
});

db.on('disconnected',()=>{
    console.log("The database is disconnected");
});

db.on('error',(error)=>{
    console.log("SERVER INTERNAL ERROR",error);
});

module.exports=db;