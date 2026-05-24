import React, { useState } from "react";
import { X, Upload, Video } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../features/videoSlice";
import Loader from "./Loader";

const UploadVideoModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    class: "",
    topic: "",
    title: "",
    description: "",
    video: null,
  });

  const [previewName, setPreviewName] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        video: file,
      });

      setPreviewName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("class", formData.class);
    data.append("topic", formData.topic);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("video", formData.video);
    dispatch(uploadVideo(data));
    setFormData({
      class: "",
      topic: "",
      title: "",
      description: "",
      video: null,
    });

    setPreviewName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
  <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

    {/* Header */}
    <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 bg-white z-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Upload Video
        </h2>
        <p className="text-sm text-gray-500">
          Add a new educational lecture
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </div>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-5"
    >
      {/* Class */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Class
        </label>
        <input
          type="text"
          name="class"
          placeholder="e.g. Class 10"
          value={formData.class}
          onChange={handleChange}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
        />
      </div>

      {/* Topic */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Topic
        </label>
        <input
          type="text"
          name="topic"
          placeholder="Enter topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Lecture title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          rows={4}
          name="description"
          placeholder="Short description..."
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none transition"
        />
      </div>

      {/* Upload Box */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Upload Video
        </label>

        <label className="border-2 border-dashed border-gray-300 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition">
          <Video className="w-12 h-12 text-gray-500 mb-3" />

          <p className="font-semibold text-gray-800">
            Click to upload video
          </p>

          <p className="text-sm text-gray-500">
            MP4, MOV supported
          </p>

          {previewName && (
            <span className="mt-3 text-sm font-medium text-green-600">
              {previewName}
            </span>
          )}

          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoChange}
          />
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-gray-300 py-3 rounded-2xl font-medium hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex-1 bg-black text-white py-3 rounded-2xl font-medium hover:opacity-90 transition"
        >
          Upload Video
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default UploadVideoModal;