'use cl'
import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded"
    >
      Toggle to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}