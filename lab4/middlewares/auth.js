const jwt = require("jsonwebtoken")
const Utils = require("util")
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
        next()
    }
    catch(err){
        return res.status(401).json({message:"you ar nyo auhyrozed "})
    }
   }


}

module.exports = {auth};