import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTasks, FaProjectDiagram, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const [user, setUser] = useState([])
    const [task, setTask] = useState([])
    const [projects, setProjects] = useState([])

    const allUser = async () => {
        const res = await axios.get("http://localhost:3000/api/user/get")
        console.log(res.data)
        setUser(res.data)
    }

    const allTask = async () =>{
        const res = await axios.get("http://localhost:3000/api/tasks/all");
        console.log(res.data);
        setTask(res.data)
    }

    const allProject = async () => {
        const res = await axios.get("http://localhost:3000/api/project")
        console.log(res.data)
        setProjects(res.data)
    }


    useEffect(()=>{
        allUser()
        allTask()
        allProject()
    },[])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-500 text-white p-4 rounded-lg flex items-center">
                    <FaTasks size={30} />
                    <div className="ml-3">
                        <h2 className="text-lg font-semibold">Tasks</h2>
                        <p>{task.length} Active</p>
                    </div>
                </div>

                <div className="bg-green-500 text-white p-4 rounded-lg flex items-center">
                    <FaProjectDiagram size={30} />
                    <div className="ml-3">
                        <h2 className="text-lg font-semibold">Projects</h2>
                        <p>{projects.length} Ongoing</p>
                    </div>
                </div>

                <div className="bg-yellow-500 text-white p-4 rounded-lg flex items-center">
                    <FaUsers size={30} />
                    <div className="ml-3">
                        <h2 className="text-lg font-semibold">Team Members</h2>
                        <p>{user.length} Connected</p>
                    </div>
                </div>

                <div className="bg-purple-500 text-white p-4 rounded-lg flex items-center">
                    <FaChartBar size={30} />
                    <div className="ml-3">
                        <h2 className="text-lg font-semibold">Reports</h2>
                        <p>View Insights</p>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/user/tasks" className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
                    Manage Tasks
                </Link>
                <Link to="/user/projects" className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
                    View Projects
                </Link>
                <Link to="/user/team" className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
                    Team Members
                </Link>
                <Link to="/user/reports" className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
                    View Reports
                </Link>
            </div>
        </div>
    );
};

export default UserDashboard;
