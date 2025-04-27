const mongose = require("mongoose")


let todoScema = mongose.Schema({
    title:{
        type:String,
        required:[true,"title is requred"],
        minLength:3,
        maxLength:23,
        unique:[true,"title must be unique"]

    },
    status:
    {
        type:String,
        enum:['to-do',"in-progress","done"],
        default:"to-do"

    },
    time:Date,
    userId:{
        type:mongose.Schema.ObjectId,
        ref:"User"
    }

},{timestamps:true})

const todoModel =  mongose.model("Todo",todoScema)

module.exports=todoModel