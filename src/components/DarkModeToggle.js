import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div
      className="btn-toggle"
      onClick={() => setDarkMode(!darkMode)}
      style={{ cursor: "pointer" }}
    >
      {darkMode ? <FaSun color="yellow" size={20} /> : <FaMoon size={20} />}
    </div>
  );
}

export default DarkModeToggle;
