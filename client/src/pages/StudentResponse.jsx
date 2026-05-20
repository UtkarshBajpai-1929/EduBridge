import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, User, CalendarDays } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getResponse } from "../features/responseSlice";
import Loader from "../components/Loader";

export default function StudentResponse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleResponse, loading } = useSelector(
    (state) => state.response
  );
  if (loading) {
    return <Loader />;
  }

  if (!singleResponse?.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
        <div className="bg-white shadow-md rounded-3xl p-8 text-center max-w-md w-full">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
            alt="No response"
            className="w-28 mx-auto mb-5"
          />

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Solution Yet
          </h2>

          <p className="text-gray-500 mb-6">
            Your teacher has not responded to this doubt yet.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">
              Back
            </span>
          </button>

          <h1 className="text-3xl font-bold text-gray-800">
            Solution
          </h1>
        </div>

        {/* Main Response Card */}
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden">
          {/* Top Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 px-8 py-7">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center shadow-md">
                <User size={28} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Teacher Response
                </h2>

                <div className="flex items-center gap-2 text-gray-500 mt-1 text-sm">
                  <CalendarDays size={16} />
                  <span>
                    {singleResponse[0]?.createdAt
                      ? new Date(
                          singleResponse[0]?.createdAt
                        ).toLocaleDateString()
                      : "Recently"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Text */}
            {singleResponse[0]?.text && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Explanation
                </h3>

                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 text-gray-700 leading-8 whitespace-pre-wrap text-[16px]">
                  {singleResponse[0].text}
                </div>
              </div>
            )}

            {/* Image */}
            {singleResponse[0]?.imageUrl && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Image Explanation
                </h3>

                <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={singleResponse[0]?.imageUrl}
                    alt="Response"
                    className="w-full object-cover hover:scale-[1.02] transition duration-300"
                  />
                </div>
              </div>
            )}

            {/* Video */}
            {singleResponse[0]?.videoUrl && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Video Explanation
                </h3>

                <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-200">
                  <video
                    controls
                    className="w-full rounded-3xl"
                  >
                    <source
                      src={singleResponse[0].videoUrl}
                    />
                    Your browser does not support
                    video playback.
                  </video>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}