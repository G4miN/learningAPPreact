import "./App.css";
import GameGrid from "./features/games/components/GameGrid";
import AddGameForm from "./features/games/components/AddGameForm";

function App() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Catálogo de Juegos</h1>
        <p>Gestiona tu colección de videojuegos</p>
      </header>
      <GameGrid />
      <AddGameForm />
    </div>
  );
}

export default App;
