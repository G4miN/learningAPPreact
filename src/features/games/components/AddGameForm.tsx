import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateGameSchema } from "../../../schemas/game.schema";
import gameService from "../services/game.service";

export default function AddGameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateGameSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await gameService.create(data);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <input {...register("title")} placeholder="Título" />
        {errors.title && <span>{errors.title.message}</span>}
        <input {...register("genreId")} placeholder="ID del género" />
        {errors.genreId && <span>{errors.genreId.message}</span>}
        <input {...register("price")} placeholder="Precio" />
        {errors.price && <span>{errors.price.message}</span>}
        <input
          {...register("releaseDate")}
          placeholder="Fecha de lanzamiento"
        />
        {errors.releaseDate && <span>{errors.releaseDate.message}</span>}
        <button type="submit">Agregar Juego</button>
      </form>
    </>
  );
}
