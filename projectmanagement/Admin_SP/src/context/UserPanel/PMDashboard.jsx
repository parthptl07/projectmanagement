import React, { useEffect, useState } from "react";
import { FaTasks, FaUsers, FaCheckCircle, FaExclamationTriangle, FaCalendarAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios'

const PMDashboard = () => {

  const [mile, setMile] = useState([])
  const [tasks, setTasks] = useState([]);

  const getAllMileStone = async () => {

    const res = await axios.get("http://localhost:3000/api/milestones")
    console.log(res.data)
    setMile(res.data)
  }

  const getAllTask = async () => {
    try {
      
      const resp = await axios.get("http://localhost:3000/api/tasks/all")
      console.log(resp.data)
      setTasks(resp.data);
  
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllMileStone(),
    getAllTask()
  },[])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Project Manager Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of the Smart Parking System project.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card icon={<FaTasks />} label="Total Tasks" value={tasks.length} />
        <Card icon={<FaCheckCircle />} label="Milestones" value={mile.length} />
        <Card icon={<FaUsers />} label="Team Members" value="12" />
        <Card icon={<FaExclamationTriangle />} label="Blockers" value="2" />
      </div>

      {/* Timeline and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Snapshot */}
        <div className="col-span-2 bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Project Timeline</h2>
          <div className="space-y-3">
            <TimelineStep phase="Planning" status="Completed" />
            <TimelineStep phase="Development" status="In Progress" />
            <TimelineStep phase="Testing" status="Pending" />
            <TimelineStep phase="Deployment" status="Pending" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Quick Actions</h2>
          <ul className="space-y-3">
            <Link to='/pm/addtask'><ActionItem icon={<FaPlus />} label="Add New Task" /></Link>
            <Link to='/pm/MileStone'> <ActionItem icon={<FaCalendarAlt />} label="Create Milestone" /></Link>

            {/* <ActionItem icon={<FaCalendarAlt />} label="Create Milestone" /> */}
            <Link to='/pm/teams'><ActionItem icon={<FaUsers />} label="Manage Team" /></Link>

            <ActionItem icon={<FaCheckCircle />} label="Generate Report" />
          </ul>
        </div>
      </div>
    </div>
  );
};

// Reusable card component
const Card = ({ icon, label, value }) => (
  <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4">
    <div className="text-blue-500 text-3xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

// Timeline Step
const TimelineStep = ({ phase, status }) => {
  const color = {
    Completed: "text-green-600",
    "In Progress": "text-yellow-600",
    Pending: "text-gray-400",
  }[status];

  return (
    <div className="flex justify-between items-center">
      <span className="font-medium text-gray-700">{phase}</span>
      <span className={`font-semibold ${color}`}>{status}</span>
    </div>
  );
};

// Action Item
const ActionItem = ({ icon, label }) => (
  <li className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 cursor-pointer">
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
  </li>
);

export default PMDashboard;
