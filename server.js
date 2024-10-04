const express=require('express');
const app=express();
const port=3000;
const db=require('./db');
const Menu=require('./models/menu');
const bodyParser=require('body-parser');


// We need to use body-parser to to parse and extract thr body coming form http request
app.use(bodyParser.json());


const passport=require('./auth');//is designed to use username and password authentication




app.use(passport.initialize());
const passwordAuth=passport.authenticate('local',{session:false});

const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();
};


app.use(logRequest);
app.get('/',passwordAuth,(req,res)=>{
    res.send("Hello!! This is running server.");
})

app.get('/chicken',(req,res)=>{
    res.send("This is having chicken url!!!!")
})

app.get('/idli',(req,res)=>{
    var idli_data={//sending response as json data
        name:'idli_type',
        hotel:'hotel_name',
        is_nice:true,
    }
    res.send(idli_data);
})



const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');
app.use('/person',passwordAuth,personRoutes);
app.use('/menu',passwordAuth,menuRoutes);

app.listen(port,()=>{
    console.log("This is listening at port:3000");
})