import type { Game } from "../../../types/game.types";

type Props = {
  game: Game;
};

export default function GameCard({ game }: Props) {
  return (
    <>
      <div>{game.title}</div>
    </>
  );
}