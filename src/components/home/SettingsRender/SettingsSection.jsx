import React, { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import UserPreference from "./UserPreference";
import EditProfile from "./EditProfile";
import { useAuth } from "../../../contexts/AuthContext";
import { useToast } from "../../../hooks/useToast";

const SettingsSection = () => {
  const toast = useToast();
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({
    userName: user.username,
    selectedColor: user.preferences?.color || "#DA4127",
    selectedTheme: user.preferences?.theme || { theme: "dark" },
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserNameChange = (newUserName) => {
    setSettings((prev) => ({
      ...prev,
      userName: newUserName,
    }));
    setErrorMessage("");
  };

  const handleColorChange = (color) => {
    setSettings((prev) => ({
      ...prev,
      selectedColor: color,
    }));
  };

  const handleThemeChange = (theme) => {
    setSettings((prev) => ({
      ...prev,
      selectedTheme: theme,
    }));
  };

  const handleSave = () => {
    if (!settings.userName?.trim()) {
      toast.error("Enter a valid username");
      return;
    }

    console.log(settings.selectedColor);
    console.log(settings.selectedTheme.theme);
    console.log(settings.userName);
  };

  return (
    <main>
      <header className="mb-6">
        <h1 className="font-medium text-xl lg:text-2xl text-[#4A6A83] dark:text-[#728AA1]">
          Settings
        </h1>
      </header>

      <div className="px-6 py-4 rounded-lg dark:bg-[#152232] bg-[#FAFAFA] space-y-6">
        <UserPreference
          onColorSelect={handleColorChange}
          onThemeSelect={handleThemeChange}
          defaultColor={settings.selectedColor}
          defaultTheme={settings.selectedTheme.theme}
        />

        <EditProfile
          onUserNameChange={handleUserNameChange}
          initialUsername={settings.userName}
        />

        <div className="flex items-center lg:flex-row flex-col-reverse justify-between gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={logout}
            className="border-red-600 border-2 hover:bg-red-600 duration-200 rounded-md text-red-600 
              hover:text-[#e9e9e9] font-semibold w-full lg:w-fit px-5 py-2 lg:py-1 
              flex items-center justify-center gap-1"
          >
            <IoLogOutOutline className="lg:text-3xl text-2xl" />
            Logout
          </button>

          <button
            onClick={handleSave}
            className="bg-[#2696E0] border-[#2696E0] border-2 text-[#e9e9e9] font-semibold 
              w-full lg:w-fit px-5 py-2 lg:py-1 flex items-center justify-center gap-1 
              rounded-md hover:bg-[#3280b4] hover:border-[#3280b4] duration-150"
          >
            <FaRegSave />
            Save
          </button>
        </div>
      </div>
    </main>
  );
};

export default SettingsSection;
