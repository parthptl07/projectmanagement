import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaTasks, FaClipboardList, FaUsers, 
  FaChartBar, FaCog, FaSignOutAlt, FaUserCircle
} from "react-icons/fa";

const ParkingOwnerSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.firstName || "User");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload()
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/user/dashboard" },
    { name: "Tasks", icon: <FaTasks />, path: "/user/tasks" },
    { name: "Projects", icon: <FaClipboardList />, path: "/user/projects" },
    { name: "Team", icon: <FaUsers />, path: "/user/team" },
    { name: "Reports", icon: <FaChartBar />, path: "/user/reports" },
    { name: "Settings", icon: <FaCog />, path: "/user/settings" },
  ];

  return (
    <>
      {/* Sidebar Container */}
      <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg 
        transition-all duration-300 ${isOpen ? "w-64" : "w-20"} flex flex-col`}>

        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <FaUserCircle size={32} className="text-blue-400" />
              <span className="text-lg font-semibold">{userName}</span>
            </div>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col mt-4 space-y-2 px-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center p-3 rounded-lg transition ${
                location.pathname === item.path ? "bg-blue-600 text-white" : "hover:bg-gray-800"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center p-3 w-full text-red-400 hover:bg-gray-800 rounded-lg"
          >
            <FaSignOutAlt size={20} />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

export default ParkingOwnerSidebar;
