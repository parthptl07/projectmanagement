import axios from 'axios';
import React, { useState } from 'react';

function AddProject() {
  const [project, setProject] = useState({
    name: '',
    manager: '',
    description: '',
    startDate: '',
    endDate: '',
    status:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3000/api/project",project)
    console.log("New Project Data:", res.data);
    alert("Project Created Successfully!");

  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name</label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Manager Name</label>
          <input
            type="text"
            name="manager"
            value={project.manager}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Enter project description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <input
            type="text"
            name="status"
            value={project.status}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Enter project name"
          />
        </div>
 
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}

export default AddProject;
