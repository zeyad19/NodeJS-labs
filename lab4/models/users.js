const mongos = require("mongoose")

const bcrypt  =require("bcryptjs")
const userSchema= mongos.Schema({
    username:{
        type:String,
        reuired:true,
        unique:true,
        minLength:3,
        maxLength:23,


    },
    firstname:{
        type:String,
        minLength:3,
        maxLength:23,
    },
    lastname:{
        type:String,
        minLength:3,
        maxLength:23
    }
    ,
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(email){
                return /^[a-zA-Z]{3,10}[0-9]{0,4}(@)(gmail|yahoo||outlook)(.com)$/.test(email)
            },
            message:(obj)=>`${obj.value} is not correct`
        }
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    }
    

},{Collection:"User",timestamps:true})

userSchema.pre('save',async function(next){

    let salt = await bcrypt.genSalt(10)
    let hasPassswrod = await bcrypt.hash(this.password,salt)
    this.password = hasPassswrod
    next()
})
const userModel = mongos.model("User",userSchema)
module.exports=userModel;
