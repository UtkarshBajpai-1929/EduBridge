import React from "react";
import { Plus } from "lucide-react";

const WelcomeHeader = ({ name, subtitle, buttonText, onClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold">
          {name}
        </h1>
        <p className="text-gray-500 mt-1">{subtitle}</p>
      </div>

      {buttonText && (
        <button
          onClick={onClick}
          className="hidden sm:hidden md:flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition"
        >
          <Plus size={18} />
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default WelcomeHeader;