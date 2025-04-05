import React, { useState } from "react";
import axios from "axios";

const CreateMilestone = ({ onCreate }) => {
  const [milestone, setMilestone] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Not Started",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMilestone((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!milestone.title || !milestone.startDate || !milestone.endDate) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/milestones", milestone);
      console.log("Milestone created:", res.data);

      // onCreate(res.data); 
      // setMilestone({
      //   title: "",
      //   description: "",
      //   startDate: "",
      //   endDate: "",
      //   status: "Not Started",
      // });
    } catch (error) {
      console.error("Error creating milestone:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Milestone</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={milestone.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={milestone.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-gray-700 font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={milestone.startDate}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-gray-700 font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={milestone.endDate}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 font-medium">Status</label>
          <select
            name="status"
            value={milestone.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Create Milestone
        </button>
      </form>
    </div>
  );
};

export default CreateMilestone;
