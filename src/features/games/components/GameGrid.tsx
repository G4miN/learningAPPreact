import { useGames } from "../hooks/useGames";
import AddGameForm from "./AddGameForm";
import GameCard from "./GameCard";

export default function GameGrid() {
  const { state, refresh } = useGames();

  return (
    <>
      {state.status === "loading" && (
        <div className="game-grid-status">Cargando juegos...</div>
      )}
      {state.status === "error" && (
        <div className="game-grid-status game-grid-error">
          Error: {state.message}
        </div>
      )}
      {state.status === "success" && (
        <div className="game-grid">
          {state.data.length === 0 ? (
            <div className="game-grid-empty">
              No hay juegos registrados aún.
            </div>
          ) : (
            state.data.map((game) => (
              <GameCard key={game.idGame} game={game} />
            ))
          )}
        </div>
      )}
      <AddGameForm onSuccess={refresh} />
    </>
  );
}
