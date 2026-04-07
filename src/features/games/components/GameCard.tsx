import type { Game } from "../../../types/game.types";

type Props = {
  game: Game;
};

export default function GameCard({ game }: Props) {
  const formattedDate = new Date(game.releaseDate).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="game-card">
      <div className="game-card-accent" />
      <div className="game-card-body">
        <div className="game-card-header">
          <h3 className="game-card-title">{game.title}</h3>
          <span className="game-card-price">${game.price.toFixed(2)}</span>
        </div>
        <div className="game-card-divider" />
        <div className="game-card-meta">
          <div className="game-card-row">
            <span className="game-card-label">Género ID</span>
            <span className="game-card-value">{game.genreId}</span>
          </div>
          <div className="game-card-row">
            <span className="game-card-label">Lanzamiento</span>
            <span className="game-card-value">{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
