import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);


    const allUser = async () => {
        const res = await axios.get("http://localhost:3000/api/user/get")
        console.log(res.data)
        setUsers(res.data)
    }

    const handleEdit = (id) => {
        alert(`Edit user with ID: ${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    useEffect(() => {
        allUser()
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-md">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Role</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4">{user.firstName}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">{user.role}</td>
                                <td className="py-2 px-4 flex items-center space-x-3">
                                    <button onClick={() => handleEdit(user.id)} className="text-blue-600 hover:text-blue-800">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
