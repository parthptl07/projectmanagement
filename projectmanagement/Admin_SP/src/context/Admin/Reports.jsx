import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

const Reports = () => {
    const [reports, setReports] = useState([]);

    // Dummy report data
    useEffect(() => {
        const dummyReports = [
            { id: 1, type: "Bookings", count: 120, date: "2025-03-25" },
            { id: 2, type: "Payments", count: 95, date: "2025-03-24" },
            { id: 3, type: "User Registrations", count: 18, date: "2025-03-23" },
        ];
        setReports(dummyReports);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Reports</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold">Total Bookings</h2>
                    <p className="text-3xl font-bold text-blue-600">1,250</p>
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold">Payments Processed</h2>
                    <p className="text-3xl font-bold text-green-600">₹2,40,000</p>
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold">Active Users</h2>
                    <p className="text-3xl font-bold text-purple-600">320</p>
                </div>
            </div>

            {/* 📊 Graph */}
            <div className="bg-white p-4 rounded shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-4">Activity Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reports}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="bg-white rounded shadow-md overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2">Report Type</th>
                            <th className="px-4 py-2">Count</th>
                            <th className="px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{report.type}</td>
                                <td className="px-4 py-2">{report.count}</td>
                                <td className="px-4 py-2">{report.date}</td>
                            </tr>
                        ))}
                        {reports.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-gray-500">
                                    No reports available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;
