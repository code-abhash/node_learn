const express=require('express');
const router=express.Router();
const app=express();
const Menu=require('../models/menu');
const bodyParser=require('body-parser');

// We need to use body-parser to to parse and extract thr body coming form http request
app.use(bodyParser.json());

router.post('',async (req,res)=>{ 
    try{
        const data=req.body;//store all the value in data
        const newMenu=new Menu(data);// creating a new person instances and passing all the data
        const response=await newMenu.save();
        console.log("data saved successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(501).json({error:'Internal server error'});
    }


})

router.get('',async(req,res)=>{
    try{
        const data= await Menu.find();
        console.log("data is fetched");
        res.status(200).json(data);
    }catch(error){
        console(error);
        res.status(501).json({error:'There is issue fetching data. INternal server error'});
    }
})

router.get('/:taste',async(req,res)=>{
    try{
        const taste= await req.params.taste;
        if(taste=='sweet'||taste=='sour'||taste=='spicy'){
            const response= await Menu.find({taste:taste});
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'No such taste avilable'});
        }
    }catch(error){
        console(error);
        res.status(501).json({error:'There is issue fetching data. INternal server error'});
    }
})

module.exports=router;