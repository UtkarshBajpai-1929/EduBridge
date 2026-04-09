import React, { useState } from "react";
import { useSelector } from "react-redux";

const Settings = () => {
  const [preview, setPreview] = useState(null);
  const {user} = useSelector(state=>state.auth);

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-dvh flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400">Manage your account settings</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={preview || user?.profileImage}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Change Profile Picture</label>
            <input
              type="file"
              className="text-sm"
              onChange={(e) =>
                setPreview(URL.createObjectURL(e.target.files[0]))
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Edit Profile</h2>

          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded-md"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-fit">
            Save Changes
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Change Password</h2>

          <input
            type="password"
            placeholder="Current Password"
            className="border p-2 rounded-md"
          />

          <input
            type="password"
            placeholder="New Password"
            className="border p-2 rounded-md"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="border p-2 rounded-md"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-fit">
            Update Password
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg text-red-600">Danger Zone</h2>

          <button className="bg-red-600 text-white px-4 py-2 rounded-md w-fit">
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;