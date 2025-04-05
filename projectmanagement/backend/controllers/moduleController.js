// controllers/moduleController.js

import express from "express";
import ModuleModel from "../models/moduleModel.js";

const moduleRouter = express.Router();

// Create a new module
moduleRouter.post("/", async (req, res) => {
  try {
    const newModule = new ModuleModel(req.body);
    const saved = await newModule.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create module", error });
  }
});

// Get all modules
moduleRouter.get("/", async (req, res) => {
  try {
    const modules = await ModuleModel.find();
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch modules", error });
  }
});

// Get module by ID
moduleRouter.get("/:id", async (req, res) => {
  try {
    const module = await ModuleModel.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch module", error });
  }
});

// Update a module
moduleRouter.put("/:id", async (req, res) => {
  try {
    const updated = await ModuleModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Module not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update module", error });
  }
});

// Delete a module
moduleRouter.delete("/:id", async (req, res) => {
  try {
    const deleted = await ModuleModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Module not found" });
    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete module", error });
  }
});

export default moduleRouter;
