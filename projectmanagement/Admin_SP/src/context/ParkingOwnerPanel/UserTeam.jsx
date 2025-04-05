import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCircle, FaUserCircle } from "react-icons/fa";

const UserTeam = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        // Mock API call to fetch team members
        allUser()
    }, []);

    const allUser = async () => {
        const res = await axios.get("http://localhost:3000/api/user/get")
        console.log(res.data)
        setTeamMembers(res.data)
    }

    // Function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case "Online":
                return "text-green-500";
            case "Offline":
                return "text-gray-500";
            case "Busy":
                return "text-yellow-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Team</h1>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {teamMembers.length > 0 ? (
                    teamMembers.map((member) => (
                        <div key={member.id} className="p-4 border-b flex items-center">
                            <FaUserCircle size={36} className="text-blue-400 mr-3" />
                            <div className="flex-grow">
                                <h2 className="font-semibold">{member.firstName}</h2>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCircle className={`${getStatusColor(member.status)}`} size={12} />
                                <span className="text-sm">{member.status}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-gray-500">No team members found.</p>
                )}
            </div>
        </div>
    );
};

export default UserTeam;
