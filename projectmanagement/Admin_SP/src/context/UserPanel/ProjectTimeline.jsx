import React from "react";
import { FaUserCircle, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Frontend Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Backend Developer",
    status: "Offline",
  },
  {
    id: 3,
    name: "Clara Evans",
    role: "Project Manager",
    status: "Active",
  },
  {
    id: 4,
    name: "Daniel Lee",
    role: "QA Engineer",
    status: "Busy",
  },
];

const statusStyles = {
  Active: {
    icon: <FaCheckCircle className="text-green-500" />,
    text: "text-green-600",
  },
  Offline: {
    icon: <FaTimesCircle className="text-gray-400" />,
    text: "text-gray-500",
  },
  Busy: {
    icon: <FaClock className="text-yellow-500" />,
    text: "text-yellow-600",
  },
};

const Teams = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Teams</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <FaUserCircle size={40} className="text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center mt-3 space-x-2">
              {statusStyles[member.status].icon}
              <span className={`text-sm font-medium ${statusStyles[member.status].text}`}>
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
