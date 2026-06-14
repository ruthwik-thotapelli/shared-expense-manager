import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

const DarkModeToggle = ({ className = "" }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-xl border border-slate-100 bg-white/80 hover:bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900/85 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500/20 ${className}`}
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex items-center justify-center text-lg"
      >
        {darkMode ? <FiSun className="text-amber-400" /> : <FiMoon className="text-slate-600" />}
      </motion.div>
    </button>
  );
};

export default DarkModeToggle;
