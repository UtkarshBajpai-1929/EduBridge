import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const UserCard = ({ name, email, role, profile }) => {
  const getInitials = (name) => {
    if(name){
          return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    }

  };

  return (
      <div className="bg-gradient-to-br from-white to-purple-50 shadow-md border border-gray-200  rounded-2xl p-4 flex flex-col items-center text-center hover:scale-101">
  
        <div className="relative">
          <div className="w-20 h-20 flex items-center justify-center rounded-full border text-purple-400 text-2xl font-semibold">
            {
              profile ?
              <img className="object-cover w-20 h-20 rounded-full" src={profile} alt="profile"/>
               : getInitials(name)
            }
          </div>
          <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0b1220]" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-black">
          {name.toUpperCase()}
        </h2>

     
        <p className="text-black text-sm">{email}</p>

        <div className="mt-3 px-4 py-1 rounded-full bg-[#1e293b] text-white text-sm flex items-center gap-2">
          🎓 {role}
        </div>


        <div className="w-full h-[0.5px] bg-gray-700 my-4" />

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-900 hover:bg-gray-800 hover:text-white transition">
            <Eye size={16} />
            View
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-900 hover:bg-gray-800 hover:text-white transition">
            <Pencil size={16} />
            Edit
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-red-400 hover:bg-red-800 hover:text-white border-red-500/30 transition">
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
  );
};

export default UserCard;