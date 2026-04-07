import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createDoubt } from "../features/doubtSlice";

const AskDoubtModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { subjects } = useSelector((state) => state.subject);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    questionText: "",
    image: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subject", formData.subject);
    data.append("questionText", formData.questionText);
    if (formData.image) data.append("image", formData.image);

    dispatch(createDoubt(data));
    onClose();
  };

  return (
   <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[90%] sm:w-125 rounded-2xl p-6 shadow-lg relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Ask a Doubt</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>Title: </label>
          <input
            type="text"
            name="title"
            placeholder="Doubt Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          >
            <option value="">Select Subject</option>
            {subjects?.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
          <label>Description: </label>
          <textarea
            name="questionText"
            placeholder="Describe your doubt..."
            value={formData.questionText}
            onChange={handleChange}
            className="border p-2 rounded-md h-24"
            required
          />

          <label>Image: </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 rounded-md"
          />

          <button
            type="submit"
            className="bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Submit Doubt
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskDoubtModal;