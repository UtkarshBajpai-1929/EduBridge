import React from "react";
import { useState } from "react";
import { CheckCircle, Copy } from "lucide-react";
import {useNavigate} from 'react-router-dom'
export default function RegistrationSuccess({ schoolId }) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const handleCopy = () => {
    navigator.clipboard.writeText(schoolId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="text-green-600 w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">
          Registration Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your school has been registered on EduBridge
        </p>

        {/* School ID Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-gray-600 mb-2">Your Unique School ID</p>

          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl font-bold text-blue-600">
              {schoolId}
            </span>
            <button onClick={handleCopy}>
              <Copy className="w-5 h-5 text-gray-700 cursor-pointer" />
            </button>
          </div>

          {copied && (
            <p className="text-green-600 text-sm">Copied!</p>
          )}

          <p className="text-gray-600 text-sm mt-2">
            Share this ID with your teachers and students to join your school
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-100 rounded-xl p-4 text-left mb-6">
          <h2 className="font-semibold mb-2">Next Steps:</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Save your School ID in a secure place</li>
            <li>Share the School ID with your teachers and students</li>
            <li>Log in to your admin dashboard</li>
            <li>Approve teacher accounts and create classes</li>
          </ol>
        </div>

        {/* Button */}
        <button
        onClick={()=>{
          navigate('/login')
        }}
        className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
          Proceed to Login
        </button>
      </div>
    </div>
  );
}