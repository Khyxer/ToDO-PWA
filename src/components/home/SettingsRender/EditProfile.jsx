import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";

const EditProfile = () => {
  const { user, logout } = useAuth();
  const [currentUser, setCurrentUser] = useState(user.username);

  return (
    <>
      <div className="grid gap-4">
        <div>
          <h2 className="font-medium lg:text-lg dark:text-[#728AA1] text-[#5A5A5A] mb-2 ">
            User Name
          </h2>
          <input
            type="text"
            value={currentUser}
            onChange={(e) => setCurrentUser()}
            className="border border-[#728AA143] bg-[#728AA113] rounded-sm placeholder:text-[#728AA155] text-[#4A6A83] dark:text-[#728AA1] font-semibold outline-none px-2 py-1"
          />
        </div>

        <div>
          <h2 className="font-medium lg:text-lg dark:text-[#728AA1] text-[#5A5A5A] mb-2 ">
            Avatar
          </h2>
          <div className="flex gap-2">
            <div>
              <div className="w-32 h-32 lg:w-40 lg:h-40 bg-[#272C38] rounded-full relative overflow-hidden">
                <label
                  htmlFor="avatar"
                  className="cursor-pointer w-full h-full absolute top-0 left-0 flex items-center justify-center text-center font-medium text-[#B9B9B9]"
                >
                  Click to update <br /> avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  className="hidden"
                />
              </div>
            </div>
            <div className="w-32 h-32 lg:w-40 lg:h-40 overflow-hidden rounded-full ">
              <img
                src={user.avatarUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-medium lg:text-lg dark:text-[#728AA1] text-[#5A5A5A] mb-2 ">
            Banner
          </h2>
          <div className="flex flex-col gap-2">
            <div>
              <div className="w-full h-28 lg:h-44 bg-[#272C38] relative overflow-hidden">
                <label
                  htmlFor="avatar"
                  className="cursor-pointer w-full h-full absolute top-0 left-0 flex items-center justify-center text-center font-medium text-[#B9B9B9]"
                >
                  Click to update banner
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  className="hidden"
                />
              </div>
            </div>
            <div className="w-full h-28 lg:h-44 overflow-hidden ">
              <img
                src={user.bannerUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <button
          className="bg-red-600 hover:bg-red-700 duration-200 rounded-md text-[#cdcdcd]  font-semibold text-xl w-fit px-5 py-1 flex items-center justify-center gap-1 mt-10 mb-2 "
          onClick={logout}
        >
          <IoLogOutOutline className="text-3xl" />
          Logout
        </button>
      </div>
    </>
  );
};

export default EditProfile;
