const valdtion = require("../middlewares/validiton")

const express = require("express")
const createTodoSchema = require("../validation/createTodo.valdtion")
let router = express.Router()
let authnt = require("../middlewares/auth")
let todoFunc = require("../controllers/todos")

router.get("/views",todoFunc.getAllTodosInviews)
router.get("/",todoFunc.getAllTodos) 

router.post("/",authnt.auth,valdtion(createTodoSchema),authnt.restrictodo("admin","user"),todoFunc.savtNewTodos)   


router.get("/:id",todoFunc.getTodoById) 
 
router.get("/user/:id",todoFunc.TodoByUseId)


router.patch("/:id",todoFunc.editTodoByid)


router.delete("/:id",authnt.restrictodo("admin"),todoFunc.deletTodoById)



module.exports=router