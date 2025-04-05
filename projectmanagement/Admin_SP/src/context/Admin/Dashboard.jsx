import React, { useEffect, useState } from "react";
import { FaUsers, FaProjectDiagram, FaChartLine, FaTasks } from "react-icons/fa";
import axios from 'axios'

const Dashboard = () => {

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
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                    <FaUsers size={30} className="text-blue-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Users</h2>
                        <p className="text-gray-600">{user.length}</p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                    <FaProjectDiagram size={30} className="text-green-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Projects</h2>
                        <p className="text-gray-600">{projects.length}</p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                    <FaTasks size={30} className="text-yellow-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Tasks</h2>
                        <p className="text-gray-600">{task.length}</p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                    <FaChartLine size={30} className="text-purple-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Reports</h2>
                        <p className="text-gray-600">12 this month</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
