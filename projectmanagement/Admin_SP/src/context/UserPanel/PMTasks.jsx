import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle, FaUser } from "react-icons/fa";
import axios from "axios"

// const sampleTasks = [
//   {
//     id: 1,
//     title: "Setup project repository",
//     status: "Completed",
//     assignedTo: "Amit",
//     dueDate: "2025-01-05",
//   },
//   {
//     id: 2,
//     title: "Create wireframes for user app",
//     status: "In Progress",
//     assignedTo: "Sneha",
//     dueDate: "2025-01-15",
//   },
//   {
//     id: 3,
//     title: "Implement booking logic (backend)",
//     status: "Pending",
//     assignedTo: "Rahul",
//     dueDate: "2025-02-05",
//   },
//   {
//     id: 4,
//     title: "Payment gateway integration",
//     status: "Pending",
//     assignedTo: "Anjali",
//     dueDate: "2025-02-20",
//   },
// ];

const statusIcon = {
  Completed: <FaCheckCircle className="text-green-500" />,
  "In Progress": <FaClock className="text-yellow-500" />,
  Pending: <FaTimesCircle className="text-gray-400" />,
};

const PMTasks = () => {
  const [tasks, setTasks] = useState([]);

  const getAllTask = async (req,res) => {
    try {
      
      const resp = await axios.get("http://localhost:3000/api/tasks/all")
      console.log(resp.data)
      setTasks(resp.data);
  
    } catch (error) {
      console.log(error)
    }
  }
  console.log(tasks)
  useEffect(() => {
    getAllTask()
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Team Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                {statusIcon[task.status]}
                <span className="ml-2">{task.title}</span>
              </h3>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <FaUser className="mr-2 text-blue-500" /> Assigned to: {task.assignedTo}
              </p>
            </div>
            <div className="text-sm text-right">
              <p className="text-gray-500">Due: {task.dueDate}</p>
              <p className={`font-semibold ${
                task.status === "Completed" ? "text-green-600" :
                task.status === "In Progress" ? "text-yellow-600" :
                "text-gray-500"
              }`}>
                {task.completed == true ? "completed" : "processing"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PMTasks;
