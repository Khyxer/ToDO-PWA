import React from "react";

const Spinner = () => {
  return (
    <div className=" flex justify-center items-center">
      <div className="w-12 h-12 animate-spin border-[3px] border-b-0 border-r-0 rounded-full border-blue-600 "></div>
    </div>
  );
};

export default Spinner;
