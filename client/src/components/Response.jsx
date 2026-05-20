import React, { useState } from "react";
import { X, ImagePlus, Video } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createResponse } from "../features/responseSlice";
import Loader from "./Loader";

export default function ResponseModal({
  isOpen,
  onClose,
  doubtId,
}) {
  const [formData, setFormData] = useState({
    text: "",
    image: null,
    video: null,
  });

  const { loading } = useSelector(
    (state) => state.response
  );

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      createResponse({ ...formData, doubtId })
    );

    if (createResponse.fulfilled.match(result)) {
      setFormData({
        text: "",
        image: null,
        video: null,
      });

      onClose();
    }
  };

  if (!isOpen) return null
  if(loading) return (
    <Loader/>
  );
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-[90%] max-w-lg rounded-2xl bg-white shadow-2xl p-6 z-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold">
            Post Response
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 font-medium">
              Response Text
            </label>

            <textarea
              rows={5}
              placeholder="Write your response..."
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={formData.text}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  text: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Upload Image
            </label>

            <label className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:bg-gray-50">
              <ImagePlus size={20} />

              <span>
                {formData.image
                  ? formData.image.name
                  : "Choose image"}
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }))
                }
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Upload Video
            </label>

            <label className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:bg-gray-50">
              <Video size={20} />

              <span>
                {formData.video
                  ? formData.video.name
                  : "Choose video"}
              </span>

              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    video: e.target.files[0],
                  }))
                }
              />
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 rounded-xl border hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={` px-5 py-2 rounded-xl text-white transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? "Posting..."
                : "Post Response"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}