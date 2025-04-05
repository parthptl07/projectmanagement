import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const ProjectModule = () => {
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState("");
  const [status, setStatus] = useState("Pending");

  // Fetch modules on mount
  const getModules = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/module");
      setModules(res.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  // Add a new module
  const handleAddModule = async () => {
    if (!newModule) return;
    try {
      const res = await axios.post("http://localhost:3000/api/module", {
        module: newModule,
        status: status,
      });
      console.log(res.data)
      setModules((prev) => [...prev, res.data]);
      setNewModule("");
      setStatus("Pending");
    } catch (error) {
      console.error("Error adding module:", error);
    }
  };

  // Delete a module
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/module/${id}`);
      setModules((prev) => prev.filter((mod) => mod._id !== id));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Modules</h2>

      {/* Module List */}
      <div className="space-y-4">
        {modules.map((mod) => (
          <div
            key={mod._id}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{mod.module}</h3>
              <p className={`text-sm font-medium ${
                mod.status === "Completed"
                  ? "text-green-600"
                  : mod.status === "In Progress"
                  ? "text-yellow-600"
                  : "text-gray-500"
              }`}>
                {mod.status}
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="text-blue-500 hover:text-blue-700">
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(mod._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Module Form */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Add New Module</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Module name"
            value={newModule}
            onChange={(e) => setNewModule(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 w-full"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button
            onClick={handleAddModule}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <FaPlus className="inline mr-2" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModule;
