const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require("../middleware/upload");

// Register
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const user = new User({
      ...req.body,
      image: req.file?.filename || null
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All First Names
router.get("/", async (req, res) => {
  const users = await User.find({}, "firstName");
  res.json(users);
});

// Delete
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Edit
router.patch("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ message: "user was edited successfully", user: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
