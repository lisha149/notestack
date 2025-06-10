import { MoonIcon, SunIcon } from "@notestack/assets/svg";
import { useDarkMode } from "@notestack/hooks/useDarkMode";

const ToggleTheme = () => {
  const [isDark, toggleTheme] = useDarkMode();

  return (
    <div className="flex items-center">
      <button
        onClick={toggleTheme}
        className={`w-14 h-7 flex items-center px-1 rounded-full transition-colors duration-300 ${
          isDark ? "bg-slate-700" : "bg-slate-300"
        }`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isDark ? "translate-x-6" : "translate-x-0"
          } flex items-center justify-center`}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </div>
      </button>
    </div>
  );
};
export default ToggleTheme;
