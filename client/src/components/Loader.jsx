import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/loading.json";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <div className="w-32 h-32">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <p className="mt-4 text-gray-600 text-sm font-medium">
        Processing...
      </p>
      
    </div>
  );
};

export default Loader;