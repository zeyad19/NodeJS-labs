const express = require("express");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const todosRoute = require("./routes/todos");
const path = require("path");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/users", usersRoute);
app.use("/todos", todosRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

module.exports = app;
