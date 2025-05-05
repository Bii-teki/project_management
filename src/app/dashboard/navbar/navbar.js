import React from 'react';
import { 
  FiHome, 
  FiCalendar, 
  FiUser, 
  FiClipboard, 
  FiCheckSquare, 
  FiSave,
  // FiDollarSign, 
  FiPackage, 
  FiSettings 
} from "react-icons/fi";

const navItems = [
  { id: "overview", label: "Overview", icon: FiHome },
  { id: "calendar", label: "Calendar", icon: FiCalendar },
  { id: "user", label: "Profile", icon: FiUser },
  { id: "users", label: "Users", icon: FiUser },
  { id: "register", label: "UserRegistration", icon: FiSave },
  { id: "projects", label: "Projects", icon: FiClipboard },
  { id: "tasks", label: "Tasks", icon: FiCheckSquare },
  // { id: "budget", label: "Budget", icon: FiDollarSign },
  { id: "materials", label: "Materials", icon: FiPackage },
  { id: "settings", label: "Settings", icon: FiSettings }
];

function Navbar({ activePage, setActivePage }) {
  return (
    <div className="hidden md:flex w-64 h-full bg-white dark:bg-gray-800 p-4 flex-col border-r border-gray-200 dark:border-gray-700">
      {/* Logo/Site Name */}
      <div className="px-4 py-6 mb-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">ProjectHub</h2>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
              activePage === item.id 
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
            }`}
          >
            <item.icon className={`text-lg mr-3 ${activePage === item.id ? "opacity-100" : "opacity-70"}`} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile/Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <FiUser className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;