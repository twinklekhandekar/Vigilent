
import React from "react";

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <button
      onClick={handleToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
        isOn ? "bg-cyan-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;


