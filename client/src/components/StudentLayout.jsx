import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import Footer from "./Footer";
const StudentLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">

      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:w-64`}
      >
        <Sidebar closeSidebar={() => setOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Mobile Topbar (only menu button) */}
        <div className="lg:hidden p-4">
          <button onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;