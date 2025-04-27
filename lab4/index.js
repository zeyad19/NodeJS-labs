const cors = require("cors")

const express = require("express")
const mongoose = require("mongoose")
const dotenv= require("dotenv")

dotenv.config()
mongoose.connect("mongodb://127.0.0.1:27017/todoApp")
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });



let todorouter = require("./routes/todos")
let usersrouter = require("./routes/users")
const app=express()





app.use(express.json())
app.use(cors())
app.use(express.static("static"))

app.set("view engine","pug")
app.set("views","./views")
app.use("/todo",todorouter);
app.use("/users",usersrouter);
app.use((req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});
app.use((err,req,res,next)=>{
  console.log(err)

  res.status(500).json({message:err.message})
  next()
})
app.listen(3333,()=>{
    console.log("app listenning succussfully in port 3333")
})


