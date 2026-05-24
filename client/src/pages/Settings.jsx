import React, { useEffect, useState } from "react";
import { Camera, Lock, Save, Trash2, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteAccount,
  updatePassword,
  updateProfile,
  uploadProfileImage,
} from "../features/authSlice";
import Loader from "../components/Loader";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState("");
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setProfileForm({
      name: user?.name || "",
      email: user?.email || "",
    });
    setPreview(user?.profileImage || "");
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    const data = new FormData();
    data.append("profileImage", file);

    try {
      await dispatch(uploadProfileImage(data)).unwrap();
      toast.success("Profile picture updated");
    } catch (error) {
      setPreview(user?.profileImage || "");
      toast.error(error || "Unable to upload profile picture");
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateProfile(profileForm)).unwrap();
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error || "Unable to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      await dispatch(updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })).unwrap();
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password updated");
    } catch (error) {
      toast.error(error || "Unable to update password");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Delete your account permanently? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await dispatch(deleteAccount()).unwrap();
      toast.success("Account deleted");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Unable to delete account");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-dvh bg-gray-100 px-4 pb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your profile, password, and account access.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <section className="rounded bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-gray-200">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-900 text-3xl font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
            <p className="text-sm capitalize text-gray-500">{user?.role}</p>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="rounded bg-gray-100 p-3">
              <p className="font-medium text-gray-500">School ID</p>
              <p className="mt-1 text-gray-900">{user?.schoolId || "Not available"}</p>
            </div>
            {user?.className && (
              <div className="rounded bg-gray-100 p-3">
                <p className="font-medium text-gray-500">Class</p>
                <p className="mt-1 text-gray-900">Grade {user.className}</p>
              </div>
            )}
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <section className="rounded bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded bg-blue-100 p-2 text-blue-700">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Edit Profile</h2>
                <p className="text-sm text-gray-500">Update your display name and email address.</p>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          <section className="rounded bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded bg-emerald-100 p-2 text-emerald-700">
                <Lock size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Change Password</h2>
                <p className="text-sm text-gray-500">Use a strong password with at least 6 characters.</p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
                >
                  <Lock size={18} />
                  Update Password
                </button>
              </div>
            </form>
          </section>

          <section className="rounded border border-red-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded bg-red-100 p-2 text-red-700">
                <Trash2 size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-red-700">Danger Zone</h2>
                <p className="text-sm text-gray-500">Deleting your account signs you out permanently.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDeleteAccount}
              className="inline-flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
