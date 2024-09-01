import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    // <label>
    //   <input
    //     type="checkbox"
    //     checked={darkMode}
    //     onChange={() => setDarkMode(!darkMode)}
    //   />
    //   Dark Mode
    // </label>
    <div className="btn-toggle" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <FaSun color="yellow" size={20} /> : <FaMoon size={20} />}
    </div>
  );
}

export default DarkModeToggle;
