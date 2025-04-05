import express from "express";
import Task from "../models/addTask.js";

const addTaskRouter = express.Router();

// Create a new task
addTaskRouter.post("/add", async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo, completed } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      assignedTo,
      completed,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
});

addTaskRouter.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

export default addTaskRouter;
