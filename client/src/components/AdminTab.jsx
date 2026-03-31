import { Filter } from "lucide-react";
import React, { useState } from "react";

const AdminTab = ({totalCount, studentCount, teacherCount, onClickStudent, onClickTeacher, onClickAll}) => {
  const [activeTab, setActiveTab] = useState("All");
  const tabsData = [
  { label: "All", count: totalCount, onClick:onClickAll},
  { label: "Students", count:studentCount, onClick:onClickStudent},
  { label: "Teachers", count: teacherCount, onClick:onClickTeacher},
];
  return (
    <div className="flex gap-10 items-center">
      <div className="flex items-center gap-1">
        <Filter size={20}/>
     <p className="text-black font-semibold">
        Filters
      </p>
    </div>
    <div className="flex items-center w-fit gap-2 p-2 rounded-xl bg-white">
      {tabsData.map((tab) => {
        const isActive = activeTab === tab.label;

        return (
          <button
            key={tab.label}
            onClick={() =>{
              setActiveTab(tab.label)
              tab.onClick();
            }
          }
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-linear-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                  : "text-gray-400 hover:text-black"
              }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
    </div>
  );
};

export default AdminTab;