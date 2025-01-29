import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleTheme from "../components/ToggleTheme";
import HeroSection from "../components/home/HeroSection";
import AddTaskButton from "../components/home/AddTaskButton";
import SettingsSection from "../components/home/SettingsRender/SettingsSection";
import TaskList from "../components/home/TasksRender/TasksSection";

const NavItem = ({ sectionName, handleChangeSection, selected }) => (
  <p
    onClick={() => handleChangeSection(sectionName)}
    className={`px-4 py-1  font-semibold] select-none font-semibold text-[17px] lg:text-xl cursor-pointer duration-150 hover:text-[#DA4127]
      ${selected ? "text-[#DA4127]" : "text-[#4A6A83] dark:text-[#728AA1]"}
      `}
  >
    {sectionName}
  </p>
);

const MainPage = () => {
  const [section, setSection] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.section) {
      setSection(location.state.section);
    }
  }, [location]);

  useEffect(() => {
    const titles = {
      Home: "ToDO Khyxer · Home",
      Task: "ToDO Khyxer · Tasks",
      Settings: "ToDO Khyxer · Settings",
    };
    document.title = titles[section] || "ToDO Khyxer";
  }, [section]);

  const handleChangeSection = (newSection) => {
    setSection(newSection);
    navigate("/", { state: { section: newSection }, replace: true });
  };

  const sections = {
    Home: <p>Soy el home</p>,
    Task: <TaskList />,
    Settings: <SettingsSection />,
  };

  return (
    <>
      <div>
        <AddTaskButton />
      </div>
      <div className="fixed z-50">
        <ToggleTheme />
      </div>
      <HeroSection />
      <div className="dark:bg-[#152232] bg-[#FAFAFA] py-2">
        <div className="flex gap-2 justify-evenly lg:justify-center lg:gap-40 items-center">
          <NavItem
            sectionName={"Home"}
            handleChangeSection={handleChangeSection}
            selected={section === "Home"}
          />
          <NavItem
            sectionName={"Task"}
            handleChangeSection={handleChangeSection}
            selected={section === "Task"}
          />
          <NavItem
            sectionName={"Settings"}
            handleChangeSection={handleChangeSection}
            selected={section === "Settings"}
          />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-7">
        <div className="w-full lg:w-[65%]">{sections[section] || null}</div>
      </div>
    </>
  );
};

export default MainPage;
