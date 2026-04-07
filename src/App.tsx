import { useState, useEffect } from "react";
import "./App.css";
import GameGrid from "./features/games/components/GameGrid";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="app-header-text">
          <h1>Catálogo de Juegos</h1>
          <p>Gestiona tu colección de videojuegos</p>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          <span className="theme-toggle-icon">
            {theme === "dark" ? "☀" : "☾"}
          </span>
          {theme === "dark" ? "Modo claro" : "Modo oscuro"}
        </button>
      </header>
      <GameGrid />
    </div>
  );
}

export default App;
