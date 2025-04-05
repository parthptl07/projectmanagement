import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';


import Login from "./context/Login";
import Signup from "./context/Signup";
import PrivateRoute from "./pagesAuth/PrivateRoute";
import AdminSidebar from "./components/Sidebar/AdminSidebar";
import ParkingOwnerSidebar from "./components/Sidebar/ParkingOwnerSidebar";
import UserSidebar from "./components/Sidebar/UserSidebar";
import PMDashboard from "./context/UserPanel/PMDashboard";
import ProjectModules from "./context/UserPanel/ProjectModules";
import PMTasks from "./context/UserPanel/PMTasks";
import PMReports from "./context/UserPanel/PMReports";
import PMSettings from "./context/UserPanel/PMSettings";
import UserDashboard from "./context/ParkingOwnerPanel/UserDashboard";
import UserTasks from "./context/ParkingOwnerPanel/UserTasks";
import UserProjects from "./context/ParkingOwnerPanel/UserProjects";
import UserTeam from "./context/ParkingOwnerPanel/UserTeam";
import UserReports from "./context/ParkingOwnerPanel/UserReports";
import UserSettings from "./context/ParkingOwnerPanel/UserSettings";
import AdminProjects from "./context/Admin/AdminProjects";
import AdminSettings from "./context/Admin/AdminSettings";
import Dashboard from "./context/Admin/Dashboard";
import ManageUsers from "./context/Admin/ManageUsers";
import Reports from "./context/Admin/Reports";
import Teams from "./context/UserPanel/ProjectTimeline";
import AddTask from "./context/UserPanel/AddTask";
import MileStone from "./context/UserPanel/MileStone";
import AddProject from "./context/Admin/AddProject";
import { Home } from "lucide-react";
import Homes from "./Home/Home";



function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("Parsed User:", parsedUser);
                setUserRole(parsedUser.role);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        setLoading(false);
    }, []);

    if (loading) {
        return <div className="flex h-screen items-center justify-center text-lg">Loading...</div>;
    }

    const mainContentClass = !userRole
        ? "flex-1 p-6 w-full"
        : `flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} w-full`;


    return (
        <Router>
            <ToastContainer />
            <div className="flex h-screen">
                {/* Dynamic Sidebar */}
                {userRole === "Admin" && <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
                {userRole === "User" && <ParkingOwnerSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
                {userRole === "ProjectManager" && <UserSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

                {/* Main Content */}
                <div className={mainContentClass}>
                    <Routes>
                        {/* Authentication Routes */}
                        {!userRole && <Route path="/" element={<Homes/>} />}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Admin Routes */}
                        {userRole === "Admin" && (
                            <Route path="" element={<PrivateRoute />}>
                                <Route path='/' element={<Navigate to='/admin/dashboard' />} />
                                <Route path="/admin/dashboard" element={<Dashboard />} />
                                <Route path="/admin/users" element={<ManageUsers />} />
                                <Route path="/admin/projects" element={<AdminProjects />} />
                                <Route path="/admin/reports" element={<Reports />} />
                                <Route path="/admin/settings" element={<AdminSettings />} />
                                <Route path="/admin/addpro" element={<AddProject />} />
                            </Route>
                        )}


                        {/* Parking Owner Routes */}
                        {userRole === "User" && (
                            <Route path="" element={<PrivateRoute />}>
                                <Route path="/" element={<Navigate to="/user/dashboard" />} />
                                <Route path="/user/dashboard" element={<UserDashboard />} />
                                <Route path="/user/tasks" element={<UserTasks />} />
                                <Route path="/user/projects" element={<UserProjects />} />
                                <Route path="/user/team" element={<UserTeam />} />
                                <Route path="/user/reports" element={<UserReports />} />
                                <Route path="/user/settings" element={<UserSettings />} />
                            </Route>
                        )}


                        {/* User Sidebar route */}
                        {userRole === "ProjectManager" && (
                            <Route path="" element={<PrivateRoute />}>
                                <Route path='/' element={<Navigate to='/pm/dashboard' />} />
                                <Route path="/pm/dashboard" element={<PMDashboard />} />
                                <Route path="/pm/modules" element={<ProjectModules />} />
                                <Route path="/pm/teams" element={<Teams />} />
                                <Route path="/pm/tasks" element={<PMTasks />} />
                                <Route path="/pm/reports" element={<PMReports />} />
                                <Route path="/pm/settings" element={<PMSettings />} />
                                <Route path="/pm/addtask" element={<AddTask />} />
                                <Route path="/pm/milestone" element={<MileStone />} />
                            </Route>
                        )}


                        {/* Redirect unknown routes */}
                        {/* <Route path="*" element={<Navigate to={userRole === "Admin" ? "/admin/dashboard" : "/owner/dashboard"} />} /> */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
