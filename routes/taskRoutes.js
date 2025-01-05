const express = require("express");
const router = express.Router();
const { readTasks, saveTasks } = require("./../utils/taskUtils");
const { categoryExists } = require("./../utils/categoryUtils");
const authenticateToken = require("./../auth/auth");
const Task = require("./../entities/task");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("./../validationSchemas/taskSchema");
// Endpoints

router.get("/tasks", authenticateToken, (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

router.post("/tasks", authenticateToken, (req, res) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, description, categoryId, completed } = req.body;

  if (!categoryExists(categoryId))
    res.status(400).json({
      message: "Category doesn't exist " + categoryExists(categoryId),
    });

  const tasks = readTasks();

  const newTask = new Task(
    Date.now(),
    title,
    description,
    categoryId,
    completed
  );

  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

router.get("/tasks/:id", authenticateToken, (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id === parseInt(req.params.id));
  if (!task) res.status(404).json({ message: "Task not found" });
  res.json(task);
});

router.put("/tasks/:id", authenticateToken, (req, res) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  if (!categoryExists(categoryId))
    res.status(400).json({ message: "Category doesn't exist" });

  const taskToUpdate = new Task(
    parseInt(req.body.id),
    req.body.title,
    req.body.description,
    req.body.categoryId,
    req.body.completed
  );

  const tasks = readTasks();
  const taskIndex = tasks.findIndex(
    (task) => task.id === parseInt(parseInt(req.body.id))
  );

  if (taskIndex === -1) res.status(404).json({ message: "Task not found" });

  originalTask = tasks[taskIndex];
  tasks[taskIndex] = { ...originalTask, ...taskToUpdate };
  saveTasks(tasks);
  res.status(200).json(tasks[taskIndex]);
});

router.delete("/tasks/:id", authenticateToken, (req, res) => {
  const tasks = readTasks();
  const TaskIndex = tasks.findIndex(
    (task) => task.id === parseInt(req.params.id)
  );
  if (TaskIndex === -1) res.status(404).json({ message: "Task not found" });

  tasks.splice(TaskIndex, 1);
  saveTasks(tasks);
  res.status(204).json("Task deleted");
});

module.exports = router;
