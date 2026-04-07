import { ConfirmDialog } from "primereact/confirmdialog";
import "./App.css";
import GameGrid from "./features/games/components/GameGrid";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ConfirmDialog />
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
        <header className="pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">Catálogo de Juegos</h1>
          <p className="text-gray-500 mt-1 text-sm">Gestiona tu colección de videojuegos</p>
        </header>
        <GameGrid />
      </div>
    </div>
  );
}
