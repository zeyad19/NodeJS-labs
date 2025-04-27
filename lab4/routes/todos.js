
const express = require("express")

let router = express.Router()
let authnt = require("../middlewares/auth")
let todoFunc = require("../controllers/todos")

router.get("/views",todoFunc.getAllTodosInviews)
router.get("/",todoFunc.getAllTodos) 

router.post("/",authnt.auth,todoFunc.savtNewTodos)   


router.get("/:id",todoFunc.getTodoById) 
 
router.get("/user/:id",todoFunc.TodoByUseId)


router.patch("/:id",todoFunc.editTodoByid)



router.delete("/:id",todoFunc.deletTodoById)



module.exports=router