import React from 'react'
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      
      <div className="text-blue-500 mb-4">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>

    </div>
  );
};

export default FeatureCard;