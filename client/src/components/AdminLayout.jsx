import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebara from "./Sidebara";
const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen sm:h-screen bg-gray-100">

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:w-64`}
      >
        <Sidebara closeSidebar={() => setOpen(false)} />
      </div>
      <div className="flex-1 flex flex-col">

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

export default AdminLayout;