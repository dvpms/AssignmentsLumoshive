import React, { useState } from "react";

const ToggleSwitch = () => {
  // State untuk menyimpan status toggle
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="hidden lg:inline-block">
      <div className="flex items-center space-x-4">
        {/* Switch */}
        <div
          className={`relative inline-block w-16 rounded-full  h-8 transition duration-200 ease-in-out transform ${
            isToggled ? "bg-black" : "bg-gray-300"
          }`}
          onClick={handleToggle}
        >
          {/* Circle */}
          <span
            className={`absolute top-1 left-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out transform ${
              isToggled ? "translate-x-8" : "translate-x-0"
            }`}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
