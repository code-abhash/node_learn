const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
    //Extract the Jwt token
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'unauthorized'});
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded
        next();
    }
    catch(err){
        console.log(err);
    }
}

// enerate token function
const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}
module.exports={jwtAuthMiddleware,generateToken};