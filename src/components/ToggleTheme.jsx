import { FaMoon, FaRegSun } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

const ToggleTheme = () => {
  const handleDarkTheme = () => {
    document.documentElement.classList.add("dark");
  };

  const handleLigthTheme = () => {
    document.documentElement.classList.remove("dark");
  };

  return (
    <>
      <div className="fixed top-5 right-5">
        <div className="flex gap-2 text-xl text-white">
          <button
            className="p-2 bg-blue-500 rounded-full "
            onClick={handleLigthTheme}
          >
            <FiSun />
          </button>
          <button
            className="p-2 bg-blue-500 rounded-full"
            onClick={handleDarkTheme}
          >
            <FaMoon />
          </button>
        </div>
      </div>
    </>
  );
};

export default ToggleTheme;
