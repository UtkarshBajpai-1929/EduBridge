import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
const Navbar = () => {
  return (
    <nav className="w-full opacity-99 bg-white z-50 shadow-sm sticky top-0 ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <GraduationCap className="text-blue-500 w-7 h-7" />
          <h1 className="text-2xl font-bold text-gray-800">
            EduBridge
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <Link
            to="/login"
          >
           <button className="px-3.5 py-2 rounded text-black font-medium hover:bg-gray-200 transition">
                Log In
            </button>
          </Link>
          <Link
            to="/signup" 
          >
            <button className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition">
            Get Started
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;