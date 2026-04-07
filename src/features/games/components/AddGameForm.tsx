import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { z } from "zod";
import { CreateGameSchema } from "../../../schemas/game.schema";
import gameService from "../services/game.service";
import { useGenres } from "../../genres/hooks/useGenres";

type Props = {
  onSuccess: () => void;
};

type CreateGameFormInput = z.input<typeof CreateGameSchema>;
type CreateGameFormOutput = z.output<typeof CreateGameSchema>;

export default function AddGameForm({ onSuccess }: Props) {
  const { state: genreState } = useGenres();

  const today = new Date();
  const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateGameFormInput, unknown, CreateGameFormOutput>({
    resolver: zodResolver(CreateGameSchema),
    defaultValues: { releaseDate: todayISO },
  });

  const onSubmit = handleSubmit(async (data) => {
    await gameService.create(data);
    reset();
    onSuccess();
  });

  const genres = genreState.status === "success" ? genreState.data : [];

  return (
    <section className="add-game-section">
      <div className="add-game-header">
        <div className="add-game-header-icon">
          <i className="pi pi-plus" />
        </div>
        <h2>Agregar Juego</h2>
      </div>
      <div className="add-game-body">
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            {/* Título */}
            <div className="form-field">
              <label htmlFor="title">Título</label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <InputText
                    id="title"
                    {...field}
                    placeholder="Ej. Doom Eternal"
                    invalid={!!errors.title}
                  />
                )}
              />
              {errors.title && (
                <small className="error-msg">{errors.title.message}</small>
              )}
            </div>

            {/* Género */}
            <div className="form-field">
              <label htmlFor="genreId">Género</label>
              <Controller
                name="genreId"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    id="genreId"
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={genres}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Selecciona un género"
                    loading={genreState.status === "loading"}
                    invalid={!!errors.genreId}
                    style={{ width: "100%" }}
                  />
                )}
              />
              {errors.genreId && (
                <small className="error-msg">{errors.genreId.message}</small>
              )}
            </div>

            {/* Precio */}
            <div className="form-field">
              <label htmlFor="price">Precio</label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    id="price"
                    value={typeof field.value === "number" ? field.value : null}
                    onValueChange={(e) => field.onChange(e.value)}
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    minFractionDigits={2}
                    placeholder="59.99"
                    invalid={!!errors.price}
                  />
                )}
              />
              {errors.price && (
                <small className="error-msg">{errors.price.message}</small>
              )}
            </div>

            {/* Fecha de lanzamiento */}
            <div className="form-field">
              <label htmlFor="releaseDate">Fecha de Lanzamiento</label>
              <Controller
                name="releaseDate"
                control={control}
                render={({ field }) => (
                  <Calendar
                    id="releaseDate"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(e) => {
                      if (e.value instanceof Date) {
                        const d = e.value;
                        const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                        field.onChange(iso);
                      } else {
                        field.onChange("");
                      }
                    }}
                    dateFormat="dd/mm/yy"
                    showIcon
                    invalid={!!errors.releaseDate}
                  />
                )}
              />
              {errors.releaseDate && (
                <small className="error-msg">
                  {errors.releaseDate.message}
                </small>
              )}
            </div>
          </div>

          <Button
            type="submit"
            label={isSubmitting ? "Guardando..." : "Agregar"}
            icon="pi pi-save"
            loading={isSubmitting}
            className="submit-btn"
          />
        </form>
      </div>
    </section>
  );
}
