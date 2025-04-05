import React, { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/tasks/add", task);
      console.log("Task added:", res.data);

      // Optionally: show success toast or message
      alert("Task successfully added!");

      // Reset form
      setTask({
        title: "",
        description: "",
        dueDate: "",
        assignedTo: "",
        completed: false,
      });
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            rows={3}
          />
        </div>

        {/* Assigned To */}
        <div>
          <label className="block text-gray-700 font-medium">Assigned To</label>
          <input
            type="text"
            name="assignedTo"
            value={task.assignedTo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter username or full name"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-gray-700 font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Completed */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-gray-700 font-medium">Completed</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
