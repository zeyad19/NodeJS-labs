const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let currentId = 1;

const loadTodos = () => {
  if (fs.existsSync('todos.json')) {
    const data = fs.readFileSync('todos.json');
    todos = JSON.parse(data);
    if (todos.length > 0) {
      currentId = Math.max(...todos.map(t => t.id)) + 1;
    } else {
      currentId = 1;
    }
  } else {
    currentId = 1;
  }
};

const saveTodos = () => {
  fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
};

loadTodos();

app.get('/todos', (req, res) => {
  let { limit = 10, skip = 0 } = req.query;
  limit = parseInt(limit);
  skip = parseInt(skip);
  const filtered = todos.slice(skip, skip + limit).map(t => ({
    title: t.title,
    status: t.status
  }));
  res.json(filtered);
});

app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

app.post('/todos', (req, res) => {
  const { title, status } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const todo = {
    id: currentId++,
    title,
    status: status || 'new'
  };
  todos.push(todo);
  saveTodos();
  res.status(201).json(todo);
});

app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  const { title, status } = req.body;
  if (title) todo.title = title;
  if (status) {
    const validStatuses = ['new', 'inProgress', 'done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    todo.status = status;
  }
  saveTodos();
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  todos.splice(index, 1);
  saveTodos();
  res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
