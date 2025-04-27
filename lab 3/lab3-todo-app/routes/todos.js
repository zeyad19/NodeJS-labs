const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Create
router.post("/", async (req, res) => {
  const { title, userId } = req.body;
  const todo = new Todo({ title, userId });
  await todo.save();
  res.status(201).json(todo);
});

// Edit
router.patch("/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

// User Todos
router.get("/user/:userId", async (req, res) => {
  const todos = await Todo.find({ userId: req.params.userId });
  res.json(todos);
});

// Pagination
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
  const todos = await Todo.find().limit(limit).skip(skip);
  res.json(todos);
});

module.exports = router;
