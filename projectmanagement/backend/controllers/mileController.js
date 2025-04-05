// controllers/milestoneController.js

import express from "express";
import MileModel from "../models/mileStone.js"; // make sure the filename matches

const mileRouter = express.Router();

// Create a new milestone
mileRouter.post("/", async (req, res) => {
  try {
    const milestone = new MileModel(req.body);
    const savedMilestone = await milestone.save();
    res.status(201).json(savedMilestone);
  } catch (error) {
    res.status(500).json({ message: "Failed to create milestone", error });
  }
});

// Get all milestones
mileRouter.get("/", async (req, res) => {
  try {
    const milestones = await MileModel.find();
    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch milestones", error });
  }
});

// Get a single milestone by ID
mileRouter.get("/:id", async (req, res) => {
  try {
    const milestone = await MileModel.findById(req.params.id);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    res.status(200).json(milestone);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch milestone", error });
  }
});

// Update a milestone
mileRouter.put("/:id", async (req, res) => {
  try {
    const updatedMilestone = await MileModel.findByIdAndUpdate(
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
mileRouter.delete("/:id", async (req, res) => {
  try {
    const deletedMilestone = await MileModel.findByIdAndDelete(req.params.id);
    if (!deletedMilestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    res.status(200).json({ message: "Milestone deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete milestone", error });
  }
});

export default mileRouter;
