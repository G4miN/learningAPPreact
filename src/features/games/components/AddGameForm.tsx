import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateGameSchema } from "../../../schemas/game.schema";
import gameService from "../services/game.service";

type Props = {
  onSuccess: () => void;
};

export default function AddGameForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(CreateGameSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await gameService.create(data);
    reset();
    onSuccess();
  });

  return (
    <section className="add-game-section">
      <div className="add-game-header">
        <h2>Agregar Juego</h2>
      </div>
      <div className="add-game-body">
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="title">Título</label>
              <input
                id="title"
                {...register("title")}
                placeholder="Ej. Doom Eternal"
                className={errors.title ? "input-error" : ""}
              />
              {errors.title && (
                <span className="error-msg">{errors.title.message}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="genreId">ID del Género</label>
              <input
                id="genreId"
                {...register("genreId")}
                placeholder="Ej. 3"
                className={errors.genreId ? "input-error" : ""}
              />
              {errors.genreId && (
                <span className="error-msg">{errors.genreId.message}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="price">Precio</label>
              <input
                id="price"
                {...register("price")}
                placeholder="Ej. 59.99"
                className={errors.price ? "input-error" : ""}
              />
              {errors.price && (
                <span className="error-msg">{errors.price.message}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="releaseDate">Fecha de Lanzamiento</label>
              <input
                id="releaseDate"
                type="date"
                {...register("releaseDate")}
                className={errors.releaseDate ? "input-error" : ""}
              />
              {errors.releaseDate && (
                <span className="error-msg">{errors.releaseDate.message}</span>
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Agregar Juego"}
          </button>
        </form>
      </div>
    </section>
  );
}
