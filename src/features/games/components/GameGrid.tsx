import { useGames } from "../hooks/useGames";
import GameCard from "./GameCard";

export default function GameGrid() {
  const state = useGames();

  if (state.status === "loading") {
    return <div className="game-grid-loading">Cargando juegos...</div>;
  }

  if (state.status === "error") {
    return <div className="game-grid-error">Error: {state.message}</div>;
  }

  return (
    <div className="game-grid">
      {state.data.length === 0 ? (
        <div className="game-grid-empty">No hay juegos registrados aún.</div>
      ) : (
        state.data.map((game) => <GameCard key={game.idGame} game={game} />)
      )}
    </div>
  );
}
