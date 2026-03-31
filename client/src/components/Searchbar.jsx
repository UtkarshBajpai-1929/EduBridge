import React from 'react'
import { Search } from "lucide-react";
const SearchBar = ({value, onChange}) => {
  return (
    <div className="relative flex w-full max-w-md ">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by name, email, ID..."
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
      <button className='ml-2 bg-linear-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded shadow-xs'>
        Search
      </button>
    </div>
  );
};

export default SearchBar;