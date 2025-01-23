import React from "react";
import ToggleTheme from "./ToggleTheme";

const Loading = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ToggleTheme />
      <div className="bg-white dark:bg-[#152232] p-8 rounded-lg flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#728AA1] font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
