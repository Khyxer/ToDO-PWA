import React from "react";

const profileColors = {
  red: "#DA4127",
  blue: "#3DB4F2",
  purple: "#C063FF",
  green: "#4CCA51",
  orange: "#EF881A",
};

const profileTheme = [
  {
    id: "dark",
    bg: "#272C38",
    text: "#FFFFFF",
  },
  {
    id: "light",
    bg: "#D9D9D9",
    text: "#272727",
  },
];

const UserPreference = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-medium lg:text-lg dark:text-[#728AA1] text-[#5A5A5A] mb-2 ">
            Profile Color
          </h2>
          <div className="flex gap-3">
            {Object.entries(profileColors).map(([key, color]) => (
              <div
                className="p-5 lg:p-7 rounded-lg cursor-pointer duration-150 hover:scale-[1.05] hover:-translate-y-[4px] "
                key={key}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-medium lg:text-lg dark:text-[#728AA1] text-[#5A5A5A] mb-2 ">
            App Theme
          </h2>
          <div className="flex gap-3">
            {profileTheme.map((profile) => (
              <div
                key={profile.id}
                style={{ backgroundColor: profile.bg }}
                className="h-[50px] w-[50px] rounded-lg flex items-end pl-1 cursor-pointer"
              >
                <p
                  style={{ color: profile.text }}
                  className="text-3xl font-semibold "
                >
                  A
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPreference;
