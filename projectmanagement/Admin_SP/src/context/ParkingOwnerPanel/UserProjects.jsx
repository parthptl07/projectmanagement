import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle, FaChartLine } from "react-icons/fa";

const UserProjects = () => {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState("All");


    const allProject = async () => {
        const res = await axios.get("http://localhost:3000/api/project")
        console.log(res.data)
        setProjects(res.data)
    }

    useEffect(() => {
        // Mock API call to fetch user projects
        allProject()
    }, []);

    // Filter projects based on status
    const filteredProjects = filter === "All" ? projects : projects.filter(proj => proj.status === filter);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Projects</h1>

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

            {/* Project List */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <div key={project.id} className="p-4 border-b flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold">{project.name}</h2>
                                <p className="text-sm text-gray-500">Deadline: {project.endDate}</p>
                                <div className="w-full bg-gray-200 h-2 rounded-md mt-2">
                                    <div 
                                        className={`h-2 rounded-md ${
                                            project.progress === 100 ? "bg-green-500" : "bg-blue-500"
                                        }`} 
                                        style={{ width: `${project.progress}%` }}>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {project.status === "Completed" && <FaCheckCircle className="text-green-500" />}
                                {project.status === "In Progress" && <FaClock className="text-yellow-500" />}
                                {project.status === "Pending" && <FaTimesCircle className="text-red-500" />}
                                <span className="text-sm font-semibold">{project.status}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-gray-500">No projects found.</p>
                )}
            </div>
        </div>
    );
};

export default UserProjects;
