import { useGames } from "../hooks/useGames";
import GameCard from "./GameCard";

export default function GameGrid() {
  const state = useGames();

  switch (state.status) {
    case "loading":
      return <div>Cargando juegos...</div>;

    case "error":
      return <div>Error: {state.message}</div>;

    case "success":
      return (
        <div>
          {state.data.map((game) => (
            <GameCard key={game.idGame} game={game} />
          ))}
        </div>
      );
  }
}
