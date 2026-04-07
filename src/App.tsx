import { useState, useEffect } from "react";
import { Button } from "primereact/button";
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
        <Button
          icon={theme === "dark" ? "pi pi-sun" : "pi pi-moon"}
          label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
          severity="secondary"
          outlined
          onClick={toggleTheme}
          className="theme-toggle"
        />
      </header>
      <GameGrid />
    </div>
  );
}

export default App;
