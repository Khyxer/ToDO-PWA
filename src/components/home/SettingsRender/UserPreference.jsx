import React, { useState } from "react";

const PROFILE_COLORS = {
  red: "#DA4127",
  blue: "#3DB4F2",
  purple: "#C063FF",
  green: "#4CCA51",
  orange: "#EF881A",
};

const THEME_OPTIONS = [
  {
    theme: "dark",
    bg: "#272C38",
    text: "#FFFFFF",
    label: "Dark Theme",
  },
  {
    theme: "light",
    bg: "#D9D9D9",
    text: "#272727",
    label: "Light Theme",
  },
];

const UserPreference = ({
  onColorSelect,
  onThemeSelect,
  defaultColor = "#DA4127",
  defaultTheme = "dark",
}) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedTheme, setSelectedTheme] = useState(defaultTheme);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    onColorSelect?.(color);
  };

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme.theme);
    onThemeSelect?.(theme);
  };

  return (
    <div className="space-y-6">
      <section aria-labelledby="color-heading">
        <h2
          id="color-heading"
          className="font-medium lg:text-lg dark:text-[#728AA1] text-[#5A5A5A] mb-2"
        >
          Profile Color
        </h2>
        <div className="flex gap-3">
          {Object.entries(PROFILE_COLORS).map(([name, color]) => (
            <button
              key={name}
              type="button"
              aria-label={`Select ${name} color`}
              aria-pressed={selectedColor === color}
              className={`
                p-5 lg:p-7 rounded-lg 
                transform transition-all duration-150
                hover:scale-105 hover:-translate-y-1
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                border-[3px] ${
                  selectedColor === color
                    ? "border-blue-800"
                    : "border-transparent"
                }
              `}
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="theme-heading">
        <h2
          id="theme-heading"
          className="font-medium lg:text-lg dark:text-[#728AA1] text-[#5A5A5A] mb-2"
        >
          App Theme
        </h2>
        <div className="flex gap-3">
          {THEME_OPTIONS.map((theme) => (
            <button
              key={theme.theme}
              type="button"
              aria-label={theme.label}
              aria-pressed={selectedTheme === theme.theme}
              className={`
                h-[50px] w-[50px] rounded-lg 
                flex items-end pl-1 
                transition-all duration-150
                hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                border-[3px] ${
                  selectedTheme === theme.theme
                    ? "border-blue-800"
                    : "border-transparent"
                }
              `}
              style={{ backgroundColor: theme.bg }}
              onClick={() => handleThemeClick(theme)}
            >
              <span
                style={{ color: theme.text }}
                className="text-3xl font-semibold select-none"
                aria-hidden="true"
              >
                A
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserPreference;
