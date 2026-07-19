// components/Header.jsx
import ThemeToggle from "./ThemeToggle";

function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="header">
      <div className="header-left">
        <span className="subtitle">Dispatch Desk</span>
        <h1 className="logo">Task Log</h1>
      </div>

      <div className="header-right">
        <div className="date-box">
          <span className="date-label">Filed</span>
          <span className="date">{today}</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;