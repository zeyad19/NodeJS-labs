
const catchErorr = require('../utils/catchAsync');
 
const todosModel = require("../models/todo")
const ApiError = require("../utils/ApiError")

let getAllTodosInviews = async (req,res)=>{


    let todos = await todosModel.find().populate("userId")
     console.log(todos)
    res.render("todo",{todos:todos})
}

let getAllTodos = catchErorr(
    async (req,res)=>{
        const limit = (+req.query.limit) || 5;
        const skip = (+req.query.skip) ||0;
        
        // try{
        console.log("hello from get all todos ")
              let todo = await todosModel.find().limit(limit).skip(skip).populate("userId");
              todo.forEach(item => {
                console.log(item.title); 
                console.log(item.userId.username); 
              });
              res.status(200).json(todo)
        // }
        // catch(err){
        //     res.status(400).json({message:err.message})
    
        // }
     
    }
    
    
)



let savtNewTodos =catchErorr(
    async (req,res)=>{
   
        let newtodo = req.body
        newtodo.userId = req.id
        console.log(newtodo)
       if(typeof newtodo === "object")
       {
        console.log("from single todo")
       
        // try{
            const savedTodo = await todosModel.create(newtodo)
            res.status(201).json({message:"success",data:savedTodo})
        // }
        // catch(err){
        //       res.status(400).json({message:err.message})
        // }
      
       }else{
        // try{
            const savedTodo = await todosModel.insertMany(newtodo)
            res.status(201).json({message:"Success to add Collection",data:savedTodo})
        // }
        // catch(err){
        //       res.status(400).json({message:err.message})
        // }
      
    
       }
    
        
    
    }
    
)


let getTodoById= async(req,res,next)=>{
    const {_id} = req.params

   
  
    try{
        let todo = await  todosModel.findById(_id)
        if(todo)
        {
                
                res.status(200).json({message:todo,data:todo})
        }
        else{
                // res.status(404).json({message:"Todo does not esxist"})
                next(new ApiError(404,"Todo does not esxist"))
        }

    }
    catch(err)
    {
        //   res.status(400).json({message:err.message})
        next(err)
    }
    
   
    
 }

 
let editTodoByid= async(req,res,next)=>{
    const {id} = req.params
    const newTodo = req.body
    console.log(newTodo)
    try{
         let todoWithId = await todosModel.findByIdAndUpdate(id,newTodo)
          if(todoWithId){
            res.status(200).json({message:"Found and update succfully",data:newTodo})
          }
          else{
            res.status(404).json({message:"Todo deos not found"})
          }
        } 
    catch(err){
        next(err)
      
    }
}

let deletTodoById= async (req,res)=>{
    const {id} = req.params
    try{
            let deletedTodById = await todosModel.findByIdAndDelete(id)
            if(deletedTodById){
                   res.status(200).json({message:"Found and deleted sussessfully"})
            }
            else{
                res.status(404).json({message:"Todo Not found "})
            }
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
    
}

let TodoByUseId = async (req,res)=>{
    let{ id }= req.params

    try{
        let todowitUserId = await todosModel.find({userId:id})
        if(todowitUserId.length){
            res.status(200).json({message:"Found all tasks",data:todowitUserId})
        }else{
            res.status(404).json({message:"not found"})
        }
    }
    catch(err){
          req.status(500).json({message:err.message})
    }
}


module.exports={deletTodoById,editTodoByid,getTodoById,savtNewTodos,getAllTodos,TodoByUseId,getAllTodosInviews }