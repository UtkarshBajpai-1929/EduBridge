import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Video,
  MessageSquare,
  Settings,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";

const menuItems = [
  { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
  { name: "Video Library", path: "/student/videos", icon: Video },
  { name: "My Doubts", path: "/student/doubts", icon: MessageSquare },
  { name: "Settings", path: "/student/settings", icon: Settings },
];

const Sidebar = ({ closeSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    if (closeSidebar) closeSidebar();
  };

  return (
    <div className="h-full flex flex-col bg-white">

      {/* 🔹 Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b">
        <div className="bg-blue-100 p-2 rounded-lg">
          <GraduationCap className="text-blue-600" size={22} />
        </div>
        <div>
          <h1 className="text-lg font-semibold">EduBridge</h1>
          <p className="text-sm text-gray-500">Student Portal</p>
        </div>
      </div>

      {/* 🔹 Menu */}
      <div className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* 🔹 Bottom Section */}
      <div className="px-4 py-4 border-t">

        {/* Profile */}
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-base font-semibold">
            {
              user?.profileImage ? (<img className="object-cover w-10 h-10 rounded-full" src={user?.profileImage}/>) :
              (user?.name?.charAt(0) || "U")
            }
          </div>

          <div className="leading-tight">
            <p className="text-sm font-medium">{user?.name || "User"}</p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role || "student"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>

      </div>
    </div>
  );
};

export default Sidebar;