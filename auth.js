const passport=require('passport');//is designed to use username and password authentication
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/person');

passport.use(new LocalStrategy(async(username,password,done)=>{
    try{
        console.log('Recieved Credentials',username,password)
        const user=await Person.findOne({username:username});
        if(!user){
            return done(null,false,{message:'Username doesnot exist'});
        }
        const isPassword=user.comparePassword(password);
        if(isPassword){
            return done(null,user);
        }else{
            return done(null,false,{message:'The password did not match.'});
        }
    }catch(err){
        return done(err);
    }
}))

module.exports=passport;