const fs = require("fs");
const path = require("path");

// === Utility functions ===
const filePath = path.join(__dirname, "data.json");

function loadTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data || "[]");
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function getNextId(tasks) {
  const ids = tasks.map((t) => t.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
}

// === Core Functions ===
function addTask(title) {
  const tasks = loadTasks();
  const newTask = {
    id: getNextId(tasks),
    title,
    status: "to-do"
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log("Task added successfully");
}

function listTasks(status) {
  const tasks = loadTasks();
  const filtered = status ? tasks.filter(t => t.status === status) : tasks;
  if (filtered.length === 0) return console.log("No tasks found.");
  filtered.forEach(task => {
    console.log(`[${task.id}] ${task.title} - ${task.status}`);
  });
}

function editTask(id, options) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return console.log("Task not found.");

  if (options.title) task.title = options.title;
  if (options.status) task.status = options.status;

  saveTasks(tasks);
  console.log("Task updated successfully");
}

function deleteTask(id) {
  const tasks = loadTasks();
  const newTasks = tasks.filter(t => t.id !== id);
  if (newTasks.length === tasks.length) {
    return console.log("Task not found.");
  }
  saveTasks(newTasks);
  console.log("Task deleted successfully");
}

// === CLI Handler ===
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add":
    const title = args[1];
    if (!title) return console.log(" Please enter a task title.");
    addTask(title);
    break;

  case "list":
    const status = args[1]; // optional
    listTasks(status);
    break;

  case "edit":
    const id = parseInt(args[1]);
    const newTitle = args[2];
    const newStatus = args[3];
    editTask(id, { title: newTitle, status: newStatus });
    break;

  case "delete":
    const deleteId = parseInt(args[1]);
    if (!deleteId) return console.log("Please enter a valid ID");
    deleteTask(deleteId);
    break;

  default:
    console.log(" Unknown command.");
    break;
}
