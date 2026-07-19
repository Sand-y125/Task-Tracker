// components/ThemeToggle.jsx
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <button
      className="theme-btn"
      onClick={() => setDarkMode(!darkMode)}
      title="Toggle shift"
      aria-label="Toggle day and night theme"
    >
      {darkMode ? "☀" : "☾"}
    </button>
  );
}

export default ThemeToggle;