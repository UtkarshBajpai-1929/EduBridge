import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createDoubt } from "../features/doubtSlice";

const AskDoubtModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { subjects } = useSelector((state) => state.subject);
  const { loading } = useSelector((state) => state.doubt);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    teacherId: "",
    questionText: "",
    image: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "subject") {
      const selectedSubject = subjects.find((s) => s._id === value);

      setFormData((prev) => ({
        ...prev,
        subject: value,
        teacherId: selectedSubject?.teacher?._id || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("subject", formData.subject);
    data.append("teacherId", formData.teacherId);
    data.append("questionText", formData.questionText);

    if (formData.image) {
      data.append("image", formData.image);
    }

    const result = await dispatch(createDoubt(data));

    if (createDoubt.fulfilled.match(result)) {
      onClose();
    }
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
          <label>Title:</label>

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

          <label>Description:</label>

          <textarea
            name="questionText"
            placeholder="Describe your doubt..."
            value={formData.questionText}
            onChange={handleChange}
            className="border p-2 rounded-md h-24"
            required
          />

          <label>Image:</label>

          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className={`py-2 rounded-md text-white transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Creating..." : "Submit Doubt"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskDoubtModal;