import React, { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerSchool } from "../features/authSlice";
import RegistrationSuccess from "../components/SchoolId";
import Loader from "../components/Loader";

export default function RegisterSchool() {
  const [form, setForm] = useState({
    name: "",
    admin: "",
    email: "",
    password: "",
    address: "",
    contact: "",
  });

  const dispatch = useDispatch();
  const { loading, school } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerSchool(form));
  };

  if (loading) return <Loader />;

  if (school) {
    return <RegistrationSuccess schoolId={school.schoolId} />;
  }

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col justify-center items-center gap-6 py-10 px-4">
      
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-blue-500 w-7 h-7" />
          <h1 className="text-2xl font-bold text-gray-800">
            EduBridge
          </h1>
        </div>
      </Link>

      {/* Form Card */}
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-md p-6">
        
        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-1">
          School Registration
        </h1>
        <p className="text-gray-500 mb-6">
          Complete this form to register your school and receive a unique School ID
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* School Name */}
          <div>
            <label className="block font-medium mb-1">
              School Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Springfield High School"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Admin Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">
                Admin Name *
              </label>
              <input
                type="text"
                name="admin"
                placeholder="John Smith"
                value={form.admin}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Admin Email *
              </label>
              <input
                type="email"
                name="email"
                placeholder="admin@school.edu"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">
              Admin Password *
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-1">
              School Address *
            </label>
            <input
              type="text"
              name="address"
              placeholder="123 Education Lane, City, State"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block font-medium mb-1">
              Contact Phone
            </label>
            <input
              type="text"
              name="contact"
              placeholder="+1 (555) 123-4567"
              value={form.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-100 text-blue-700 p-4 rounded-lg text-sm">
            Upon registration, you will receive a unique School ID that teachers and students will use to join your school on the platform.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Register School
          </button>
        </form>
      </div>
    </div>
  );
}