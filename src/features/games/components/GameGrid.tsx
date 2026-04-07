import { useGames } from "../hooks/useGames";
import AddGameForm from "./AddGameForm";
import GameCard from "./GameCard";

export default function GameGrid() {
  const { state, refresh } = useGames();

  return (
    <div className="flex flex-col gap-6">
      {state.status === "loading" && (
        <p className="text-center text-gray-400 py-12">Cargando juegos...</p>
      )}
      {state.status === "error" && (
        <p className="text-center text-red-500 py-12">Error: {state.message}</p>
      )}
      {state.status === "success" && (
        state.data.length === 0 ? (
          <p className="text-center text-gray-400 py-12 border-2 border-dashed border-gray-200 rounded-xl">
            No hay juegos registrados aún.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.data.map((game) => (
              <GameCard key={game.idGame} game={game} onRefresh={refresh} />
            ))}
          </div>
        )
      )}
      <AddGameForm onSuccess={refresh} />
    </div>
  );
}
