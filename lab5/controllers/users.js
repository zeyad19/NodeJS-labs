const userModel = require("../models/users")
const jwt = require("jsonwebtoken")
const joi = require("joi")
const bcrypt= require("bcryptjs")

let getAllUser = async (req,res)=>{
   try{
    let users = await userModel.find().select("firstname")

    res.status(200).json({data:users})
   }
   catch(err){
    req.status(404).json({message:err.message})
   }
}

let getUserById = async (req,res)=>{
  let {id} = req.params
  
  try{
         let userwithIdfound = await userModel.findById(id)
         if(userwithIdfound){
          res.status(200).json({message:"found",data:userwithIdfound})
         }
         else{
          res.status(201).json({message:"not found user"})
         }
  }
  catch(err){
    req.status(404).json({message:err.message})
  }

  // res.status(200).json({data:users})
}


let saveUser= async (req,res)=>{
  let user = req.body
  let image = req.file ? req.file.path:undefined
  let newUser = await userModel.create({...user,image:image})
  res.status(200).json({ message: "User saved" }); 
}


let deletUserByid=async (req,res)=>{
       let {id} = req.params
       try{
            let deltedUser = await userModel.findByIdAndDelete(id)
            if(deltedUser){
              res.status(200).json({message:"Deleted successfully"})
            }
            else{
              res.status(404).json({message:"user not founded"})
            }
       }
       catch(err){
        res.status(500).json({message:err.message})

       }
}

let UpdatById = async (req,res)=>{
     let {id} = req.params
     let newUpdat = req.body
     try{
             let updatedUser = await userModel.findByIdAndUpdate(id,newUpdat)
             
             if(updatedUser){
              res.status(200).json({message:"Found and update succesfully"})
             }
             else{
              res.status(404).json({message:"User not found"})
             }
         }
     catch(err){
      res.status(400).json({message:err.message})

     }

}


let loginUser = async (req,res)=>{

  let {email,password} = req.body
  console.log(email,password)
  if(!email || !password){
    return res.status(400).json({message:"you must send eamil and oassword "})
  }
  else{
    let user = await userModel.findOne({email:email})
    if(user){
         let validUser = await bcrypt.compare(password,user.password)
         if(validUser){

          let token =  jwt.sign({id:user._id,email:user.email,role:user.role},process.env.SECRET)
          return res.status(200).json({message:"correct email and passeord ",token:token})
         }
         else{
          return res.status(404).json({message:"invalid email or password try again"})
         }   
        }
    else{
        return  res.status(400).json({message:"invlaid email or passeor "})
    }
  }

}

let updatpassword = async (req,res)=>{

  let {currentpassword,password} = req.body
  console.log(currentpassword,password)
 
  
  if(!currentpassword || !password){
     return res.status(401).json({message:"you must provid cuurent or pass"})
  }
  else{
    let user = await userModel.findById(req.id)
    if(user){
      let validuser = await bcrypt.compare(currentpassword,user.password)
      if(validuser){
        // let salt = await bcrypt.genSalt(10)
        // let hashedpassword = await bcrypt.hash(password,salt)
        user.password = password
        await user.save()
        let token =  jwt.sign({id:user._id,email:user.email,role:user.role},process.env.SECRET)
        return res.status(200).json({message:"Change password succesfully ",token:token})
    }
    else{
      return res.status(401).json({message:"invalid current password"})
    }
  }
  }

}

module.exports={updatpassword,getAllUser,saveUser,deletUserByid,loginUser,UpdatById,getUserById}