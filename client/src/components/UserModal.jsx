import React from "react";

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div
        onClick={(e)=>e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✖
        </button>

        <div className="flex flex-col items-center text-center">
          
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-xl font-bold">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              user.name?.[0]
            )}
          </div>

          <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          {
            user.className ? <p className="text-gray-500">Class: {user.className}</p> : null
          }
          
          <div className="mt-3 px-3 py-1 bg-gray-800 text-white rounded-full text-sm">
            {user.role}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p><strong>User ID:</strong> {user._id}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserModal;