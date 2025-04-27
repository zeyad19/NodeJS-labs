const cors = require("cors")
const multer = require("multer")
const express = require("express")
const mongoose = require("mongoose")
const dotenv= require("dotenv")
const APiErorr = require("./utils/ApiError")
let todorouter = require("./routes/todos")
let usersrouter = require("./routes/users")
dotenv.config()
mongoose.connect("mongodb://127.0.0.1:27017/todoApp")
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });




const app=express()

const storge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname+"-" + file.originalname);
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images (jpeg, jpg, png) are allowed"));
  }
});
const upload = multer({ storage: storge })
app.use("/profile",upload.single("avatar"),function(req,res,next){
  res.send("File Uploaded")
})


app.use(express.json())
app.use(cors())
app.use(express.static("static"))

app.set("view engine","pug")
app.set("views","./views")
app.use("/todo",todorouter);
app.use("/users",usersrouter);
app.use((err,req, res,next) => {
  // res.status(404).json({ message: "Page Not Found" });
   next(new APiErorr(404,"Page Not Found"))
});


app.use((err,req,res,next)=>{
  console.log(err)
  let statusCode = err.statusCode?err.statusCode:500

  res.status(statusCode).json({message:err.message})
  // next()
})
app.listen(3333,()=>{
    console.log("app listenning succussfully in port 3333")
})


