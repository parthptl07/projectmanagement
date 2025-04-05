// controllers/milestoneController.js

import express from "express";
import ProjectModel from "../models/projectModel.js";


const projectRouter = express.Router(); 

// Create a new milestone
projectRouter.post("/", async (req, res) => {
  try {
    const milestone = new ProjectModel(req.body);
    const savedMilestone = await milestone.save();
    res.status(201).json(savedMilestone);
  } catch (error) {
    res.status(500).json({ message: "Failed to create milestone", error });
  }
});

// Get all milestones
projectRouter.get("/", async (req, res) => {
  try {
    const milestones = await ProjectModel.find();
    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch milestones", error });
  }
});

// Get a single milestone by ID
projectRouter.get("/:id", async (req, res) => {
  try {
    const milestone = await ProjectModel.findById(req.params.id);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    res.status(200).json(milestone);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch milestone", error });
  }
});

// Update a milestone
projectRouter.put("/:id", async (req, res) => {
  try {
    const updatedMilestone = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMilestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    res.status(200).json(updatedMilestone);
  } catch (error) {
    res.status(500).json({ message: "Failed to update milestone", error });
  }
});

// Delete a milestone
projectRouter.delete("/:id", async (req, res) => {
  try {
    const deletedMilestone = await ProjectModel.findByIdAndDelete(req.params.id);
    if (!deletedMilestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    res.status(200).json({ message: "Milestone deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete milestone", error });
  }
});

export default projectRouter;
