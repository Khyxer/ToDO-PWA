import { FaMoon, FaRegSun } from "react-icons/fa";

const ToggleTheme = () => {
  const handleDarkTheme = () => {
    document.documentElement.classList.add("dark");
  };

  const handleLigthTheme = () => {
    document.documentElement.classList.remove("dark");
  };

  return (
    <>
      <div className="fixed top-5 left-5">
        <div className="flex gap-2">
          <button
            className="p-2 bg-blue-500 text-white rounded-full"
            onClick={handleLigthTheme}
          >
            <FaRegSun />
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded-full"
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
