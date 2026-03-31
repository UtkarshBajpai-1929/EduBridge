import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteSubject } from "../features/subjectSlice";


const SubjectCard = ({ id, name, className, teacher, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSubject(id))
  };

  return (
    <div className="w-full bg-linear-to-br from-white to-blue-50 border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.01]">

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-800 wrap-break-word">
          {name}
        </h2>

        <p className="text-sm text-gray-600">
          Class: <span className="font-medium">{className}</span>
        </p>

        <p className="text-sm text-gray-600">
          Teacher: <span className="font-medium">{teacher}</span>
        </p>
      </div>

      <div className="w-full h-px bg-gray-200" />

      <div className="flex gap-3 flex-wrap">

        <button
          onClick={() => onEdit(id)}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-800 hover:text-white transition"
        >
          <Pencil size={14} />
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg border border-gray-300 text-red-500 hover:bg-red-600 hover:text-white transition"
        >
          <Trash2 size={14} />
          Delete
        </button>

      </div>
    </div>
  );
};

export default SubjectCard;