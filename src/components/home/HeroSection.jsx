import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../../public/assets/BigLogo.svg";

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="relative w-full h-32 xl:h-64 ">
        {user.bannerUrl ? (
          <img
            src={user.bannerUrl}
            alt="Profile Banner"
            className="w-full h-full object-cover select-none "
          />
        ) : (
          <div className="w-full h-full bg-[#4C62CD] flex justify-center items-center overflow-hidden ">
            <img src={logo} alt="" />
          </div>
        )}
        <div className="absolute left-[9.5rem] xl:left-[10.5rem]">
          <p className="text-[#4C4C4C] dark:text-[#D3D3D3] text-2xl lg:text-3xl font-bold">
            {user.username}
          </p>
        </div>
        <div className="absolute -bottom-16 left-8">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Profile Avatar"
              className="xl:w-32 xl:h-32 w-28 h-28 rounded-full border-4 border-[#FAFAFA] dark:border-[#152232] 
              shadow-lg object-cover select-none "
            />
          ) : (
            <div
              className="xl:w-32 xl:h-32 w-28 h-28 rounded-full border-4 border-[#FAFAFA] dark:border-[#152232] 
            shadow-lg bg-gray-300 flex items-center justify-center"
            >
              <span className="text-6xl font-bold text-gray-600">
                {user.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="dark:bg-[#152232] bg-[#FAFAFA] lg:h-[30px] h-[65px]"></div>
    </>
  );
};

export default HeroSection;
