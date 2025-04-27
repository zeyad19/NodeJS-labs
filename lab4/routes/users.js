
const express = require("express")
const usesrFunc = require("../controllers/users")

let router=express.Router()

router.get("/",usesrFunc.getAllUser)
router.get("/:id",usesrFunc.getUserById)
router.post("/",usesrFunc.saveUser)
router.delete("/:id",usesrFunc.deletUserByid)
router.patch("/:id",usesrFunc.UpdatById)
router.post("/login",usesrFunc.loginUser)
module.exports=router