const valdtion = require("../middlewares/validiton")
const express = require("express")
const registersvem = require("../validation/register.validaiton")

const usesrFunc = require("../controllers/users")
let auth = require("../middlewares/auth")
let router=express.Router()

router.get("/",usesrFunc.getAllUser)

router.get("/:id",usesrFunc.getUserById)
router.post("/",valdtion(registersvem),usesrFunc.saveUser)
router.delete("/:id",usesrFunc.deletUserByid)
router.patch("/updatepassword",auth.auth,usesrFunc.updatpassword)
router.patch("/:id",usesrFunc.UpdatById)
router.post("/login",usesrFunc.loginUser)
module.exports=router