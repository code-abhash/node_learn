const express=require('express');
const router=express.Router();
const app=express();
const Person=require('../models/person');
const bodyParser=require('body-parser');

// We need to use body-parser to to parse and extract thr body coming form http request
app.use(bodyParser.json());

const {jwtAuthMiddleware,generateToken}=require('./../jwt');

router.post('/signup',async (req,res)=>{ 
    try{
        const data=req.body;//store all the value in data
        const newPerson=new Person(data);// creating a new person instances and passing all the data
        const response=await newPerson.save();
        console.log("data saved successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(501).json({error:'Internal server error'});
    }
})

router.get('',async(req,res)=>{
    try{
        const data= await Person.find();
        console.log("data is fetched");
        res.status(200).json(data);
    }catch(error){
        console.log(error);
        res.status(501).json({error:'There is issue fetching data. INternal server error'});
    }
})

router.get('/:work',async (req,res)=>{
    const work=req.params.work;
    try{
    if(work=='chef'||work=='waiter'||work=='manager'){
        const response= await Person.find({work:work});
        res.status(200).json(response);
          
    }else{
        res.status(404).json({error:'No person related to such worktype'});
    }}catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }

})

router.put('/:id',async(req,res)=>{
    const id=req.params.id;
    const updatePersonData=req.body;
    try{
        const updatedPerson=await Person.findByIdAndUpdate(id,updatePersonData,{new:true,runValidators:true})
        if(!updatedPerson){
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json(updatedPerson);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports=router;