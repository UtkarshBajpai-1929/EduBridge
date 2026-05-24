import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/schoolSlice";

const UserCard = ({ name, email, role, profile, userId, onView }) => {
  const dispatch = useDispatch();

  const handleDelete = ()=>{
    if(window.confirm("Delete this user?")){
      dispatch(deleteUser(userId));
    }
  }

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
  <div className="w-full bg-linear-to-br from-white to-purple-50 shadow-sm shadow-indigo-500 border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center transition-transform duration-200 hover:scale-[1.01]">

    <div className="relative">
      <div className="w-20 h-20 flex items-center justify-center rounded-full border text-indigo-500 text-2xl font-semibold overflow-hidden">
        {
          profile ? (
            <img
              className="object-cover w-full h-full"
              src={profile}
              alt="profile"
            />
          ) : (
            getInitials(name)
          )
        }
      </div>
      <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
    </div>

    <h2 className="mt-4 text-base sm:text-lg font-semibold text-black wrap-break-word">
      {name?.toUpperCase()}
    </h2>

    <p className="text-gray-600 text-xs sm:text-sm break-all">
      {email}
    </p>

    <div className="mt-3 px-3 py-1 rounded-full bg-indigo-500 text-white text-xs sm:text-sm flex items-center gap-2">
      🎓 {role}
    </div>

    <div className="w-full h-[1px] bg-gray-200 my-4" />

    <div className="flex flex-wrap justify-center gap-2 w-full">
      
      <button
        onClick={onView}
        className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-800 hover:text-white transition"
      >
        <Eye size={14} />
        View
      </button>

      <button
        onClick={() => {
          alert("This feature will available soon.")
        }}
        className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-800 hover:text-white transition"
      >
        <Pencil size={14} />
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm rounded-lg border border-gray-300 text-red-500 hover:bg-red-600 hover:text-white transition"
      >
        <Trash2 size={14} />
        Delete
      </button>

    </div>
  </div>
);
};

export default UserCard;
