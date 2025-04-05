import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUsersCog,
    FaProjectDiagram,
    FaChartLine,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaUserShield
} from "react-icons/fa";

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [adminName, setAdminName] = useState("Admin");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const parsedUser = JSON.parse(user);
            setAdminName(`${parsedUser.firstName || "Admin"}`);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    };

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
        { name: "User Management", icon: <FaUsersCog />, path: "/admin/users" },
        { name: "Projects", icon: <FaProjectDiagram />, path: "/admin/projects" },
        { name: "Reports", icon: <FaChartLine />, path: "/admin/reports" },
        { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 text-white bg-gray-900 p-2 rounded-full shadow-md lg:hidden"
            >
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>

            <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg transition-all duration-300
                ${isOpen ? "w-64" : "w-20"} flex flex-col p-4`}>

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <FaUserShield size={30} className="text-yellow-400" />
                        {isOpen && <span className="text-lg font-semibold">{adminName}</span>}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col space-y-3">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex items-center p-3 rounded-md transition ${
                                location.pathname === item.path
                                    ? "bg-yellow-600 text-white"
                                    : "hover:bg-gray-700 text-gray-300"
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {isOpen && <span className="ml-3">{item.name}</span>}
                        </Link>
                    ))}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center p-3 text-red-400 hover:bg-red-600 hover:text-white rounded-md"
                    >
                        <FaSignOutAlt size={20} />
                        {isOpen && <span className="ml-3">Logout</span>}
                    </button>
                </nav>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default AdminSidebar;
