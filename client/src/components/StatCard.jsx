import React from "react";
const StatCard = ({ title, value, subtitle, icon, bgColor }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex justify-between items-start">
      
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-semibold mt-1">{value}</h2>
        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
      </div>

      <div className={`p-3 rounded-xl ${bgColor}`}>
        {icon}
      </div>

    </div>
  );
};

export default StatCard;