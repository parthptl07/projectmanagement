import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);


    const allProject = async () => {
        const res = await axios.get("http://localhost:3000/api/project")
        console.log(res.data)
        setProjects(res.data)
    }

    useEffect(() => {
        allProject()
    }, []);

    const handleEdit = (id) => {
        alert(`Edit project with ID: ${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            setProjects(projects.filter(project => project.id !== id));
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Admin Projects</h1>   
                <Link to="/admin/addpro" >       
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                    <FaPlus className="mr-2" />
                    Add Project
                </button>
                </Link> 
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left px-4 py-2">Project Name</th>
                            <th className="text-left px-4 py-2">Status</th>
                            <th className="text-left px-4 py-2">Manager</th>
                            <th className="text-left px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{project.name}</td>
                                <td className="px-4 py-2">{project.status}</td>
                                <td className="px-4 py-2">{project.manager}</td>
                                <td className="px-4 py-2 flex items-center space-x-3">
                                    <button onClick={() => handleEdit(project.id)} className="text-blue-600 hover:text-blue-800">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-800">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">No projects found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProjects;
