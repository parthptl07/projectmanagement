import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const UserTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        // Mock API call to fetch user tasks
       allTask()
    }, []);

    const allTask = async () => {
        const res = await axios.get("http://localhost:3000/api/tasks/all");
        setTasks(res.data)
    }

    // Filter tasks based on status
    const filteredTasks = filter === "All" ? tasks : tasks.filter(task => task.status === filter);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

            {/* Filter Options */}
            <div className="mb-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Task List */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <div key={task.id} className="p-4 border-b flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold">{task.title}</h2>
                                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                {task.completed === "true" && <FaCheckCircle className="text-green-500" />}
                                {task.completed === "In Progress" && <FaClock className="text-yellow-500" />}
                                {task.completed === "Pending" && <FaTimesCircle className="text-red-500" />}
                                <span className="text-sm font-semibold">{task.status}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-gray-500">No tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default UserTasks;
