import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const HeroSection = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="relative w-full h-32 xl:h-64 mb-20">
        {user.bannerUrl ? (
          <img
            src={user.bannerUrl}
            alt="Profile Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500" />
        )}
        <div className="absolute left-[9.5rem] xl:left-[10.5rem]">
          <p className="text-[#4C4C4C] dark:text-[#D3D3D3] text-2xl font-bold">
            {user.username}
          </p>
        </div>
        <div className="absolute -bottom-16 left-8">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Profile Avatar"
              className="xl:w-32 xl:h-32 w-28 h-28 rounded-full border-4 border-[#EDF1F5] dark:border-[#0B1622] shadow-lg dark:shadow-none object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-300 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">
                {user.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
