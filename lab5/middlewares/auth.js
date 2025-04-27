const jwt = require("jsonwebtoken")
const Utils = require("util")
//authorization
async function auth  (req,res,next){
   let {authorization} = req.headers

   if(!authorization){
    return res.status(401).json({message:"you must log in first  not authorized"})
   }
   else{
    try{
        let decoded =  await Utils.promisify(jwt.verify)(authorization,process.env.SECRET)
        console.log(decoded)
        req.id = decoded.id
        req.role = decoded.role
        next()
    }
    catch(err){
        return res.status(401).json({message:"you ar nyo auhyrozed "})
    }
   }


}

// authntication

function restrictodo(...roles) {
       
    
    return  (req,res,next)=>{
        if(roles.includes(req.role)){
            next()
        }
        else{
            res.status(403).json({message:"You dont have permission for this action"})
        }

    }
}



module.exports = {auth,restrictodo};