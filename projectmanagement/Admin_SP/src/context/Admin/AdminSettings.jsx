import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaBell, FaEye, FaPalette, FaAdjust } from "react-icons/fa";

const AdminSettings = () => {
    const [theme, setTheme] = useState("light");
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [highContrast, setHighContrast] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <div className="p-6 space-y-6 bg-white dark:bg-gray-900 min-h-screen transition-colors">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Theme Settings */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <FaPalette /> Theme
                    </h2>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Toggle Light/Dark Mode</span>
                        <button
                            onClick={toggleTheme}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {theme === "light" ? <FaMoon /> : <FaSun />}
                        </button>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <FaBell /> Notifications
                    </h2>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Enable Alerts</span>
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                            className="toggle toggle-primary"
                        />
                    </div>
                </div>

                {/* Accessibility */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <FaAdjust /> Accessibility
                    </h2>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">High Contrast Mode</span>
                        <input
                            type="checkbox"
                            checked={highContrast}
                            onChange={() => setHighContrast(!highContrast)}
                            className="toggle toggle-accent"
                        />
                    </div>
                </div>

                {/* Layout Preferences */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <FaEye /> Layout Preferences
                    </h2>
                    <div className="mt-4">
                        <label className="block text-gray-600 dark:text-gray-300 mb-2">Sidebar Style:</label>
                        <select className="w-full p-2 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                            <option>Expanded</option>
                            <option>Collapsed</option>
                            <option>Hidden</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
