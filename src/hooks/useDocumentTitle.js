// hooks/useDocumentTitle.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useDocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "ToDO Khyxer · Home",
      "/login": "ToDO Khyxer · Login",
      "/register": "ToDO Khyxer · Register",
      "/loading": "ToDO Khyxer · Loading",
    };

    if (location.pathname === "/" && location.state?.section) {
      const sectionTitles = {
        Home: "ToDO Khyxer · Home",
        Task: "ToDO Khyxer · Tasks",
        Settings: "ToDO Khyxer · Settings",
      };
      document.title = sectionTitles[location.state.section] || "TaskMinder";
      return;
    }

    document.title = titles[location.pathname] || "TaskMinder";
  }, [location]);
};
