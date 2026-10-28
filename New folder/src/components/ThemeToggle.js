'use client';

import { useTheme } from "@/src/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle"
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <i className={`fas ${isDark ? "fa-sun" : "fa-moon"}`} />
    </button>
  );
};

export default ThemeToggle;