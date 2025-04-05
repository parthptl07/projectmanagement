import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome, FaProjectDiagram, FaTasks, FaFileAlt,
  FaCog, FaSignOutAlt, FaBars, FaTimes, FaUserCircle, FaUsers
} from "react-icons/fa";

const ProjectSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user info
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.firstName || "Project Manager");
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  // Navigation items
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/pm/dashboard" },
    { name: "Modules", icon: <FaProjectDiagram />, path: "/pm/modules" },
    { name: "Tasks", icon: <FaTasks />, path: "/pm/tasks" },
    { name: "Reports", icon: <FaFileAlt />, path: "/pm/reports" },
    { name: "Teams", icon: <FaUsers />, path: "/pm/teams" }, // ✅ Added Teams
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 text-white bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-800 transition lg:hidden z-50"
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 z-40 ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col p-3`}
      >
        {/* User Info */}
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-md">
          <div className="flex items-center">
            <FaUserCircle size={36} className="text-blue-400" />
            {isOpen && <span className="ml-3 text-lg font-semibold">{userName}</span>}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col mt-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center p-3 rounded-lg text-gray-300 transition ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}

          {/* Settings Link */}
          <Link
            to="/pm/settings"
            className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition"
          >
            <FaCog size={20} />
            {isOpen && <span className="ml-3">Settings</span>}
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center p-3 w-full text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition mt-auto"
          >
            <FaSignOutAlt size={20} />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </nav>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default ProjectSidebar;
