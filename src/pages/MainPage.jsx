import React from "react";
import ToggleTheme from "../components/ToggleTheme";
import { useAuth } from "../contexts/AuthContext";
import HeroSection from "../components/home/HeroSection";

const MainPage = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="fixed z-50">
        <ToggleTheme />
      </div>
      <HeroSection />
      <button
        className="px-4 py-1 text-white bg-red-600 rounde-lg "
        onClick={logout}
      >
        Log out
      </button>
    </>
  );
};

export default MainPage;
