import React, { useState, useEffect } from "react";

const PMSettings = () => {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    taskReminders: false,
    weeklySummary: true,
  });

  const [theme, setTheme] = useState("light");

  const [teamMembers, setTeamMembers] = useState([
    { name: "Alice", role: "Developer" },
    { name: "Bob", role: "Designer" },
  ]);

  const [profile, setProfile] = useState({
    name: "Parth Patel",
    email: "parth@example.com",
  });

  // Apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(savedTheme);
  }, []);

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const handleThemeChange = (e) => {
    const value = e.target.value;
    setTheme(value);
    localStorage.setItem("theme", value);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(value);
  };

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "" }]);
  };

  const handleMemberChange = (index, key, value) => {
    const updated = [...teamMembers];
    updated[index][key] = value;
    setTeamMembers(updated);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    console.log("Saved Settings:", {
      profile,
      notifications,
      theme,
      teamMembers,
    });
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 space-y-6 max-w-4xl mx-auto transition-colors duration-300">
      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            className="border p-3 rounded dark:bg-gray-700 dark:text-white"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            className="border p-3 rounded dark:bg-gray-700 dark:text-white"
            placeholder="Email"
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="emailUpdates"
              checked={notifications.emailUpdates}
              onChange={handleNotificationChange}
            />
            <span className="ml-2">Email me when updates occur</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="taskReminders"
              checked={notifications.taskReminders}
              onChange={handleNotificationChange}
            />
            <span className="ml-2">Task deadline reminders</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="weeklySummary"
              checked={notifications.weeklySummary}
              onChange={handleNotificationChange}
            />
            <span className="ml-2">Weekly summary reports</span>
          </label>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Theme Preferences</h2>
        <select
          value={theme}
          onChange={handleThemeChange}
          className="w-full border p-3 rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>

      {/* Team Members */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
        {teamMembers.map((member, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-3">
            <input
              type="text"
              value={member.name}
              onChange={(e) =>
                handleMemberChange(index, "name", e.target.value)
              }
              className="border p-2 rounded dark:bg-gray-700 dark:text-white"
              placeholder="Name"
            />
            <input
              type="text"
              value={member.role}
              onChange={(e) =>
                handleMemberChange(index, "role", e.target.value)
              }
              className="border p-2 rounded dark:bg-gray-700 dark:text-white"
              placeholder="Role"
            />
          </div>
        ))}
        <button
          onClick={handleAddMember}
          className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded"
        >
          Add Member
        </button>
      </div>

      {/* Save Button */}
      <div className="text-right">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default PMSettings;
