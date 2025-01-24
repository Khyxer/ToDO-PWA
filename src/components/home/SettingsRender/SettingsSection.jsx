import React from "react";
import UserPreference from "./UserPreference";
import EditProfile from "./EditProfile";

const SettingsSection = () => {
  return (
    <div className="px-5 py-7 ">
      <h1 className="font-medium text-xl lg:text-2xl text-[#4A6A83] dark:text-[#728AA1] mb-3 ">
        Settings
      </h1>
      <div className="px-6 py-4 rounded-lg dark:bg-[#152232] bg-[#FAFAFA] gap-4 grid">
        <UserPreference />
        <EditProfile />
      </div>
    </div>
  );
};

export default SettingsSection;
