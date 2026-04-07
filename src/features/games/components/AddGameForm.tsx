import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { CreateGameSchema } from "../../../schemas/game.schema";
import gameService from "../services/game.service";
import { useGenres } from "../../genres/hooks/useGenres";

type Props = { onSuccess: () => void };
type CreateIn = z.input<typeof CreateGameSchema>;
type CreateOut = z.output<typeof CreateGameSchema>;

export default function AddGameForm({ onSuccess }: Props) {
  const { state: genreState } = useGenres();

  const today = new Date();
  const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateIn, unknown, CreateOut>({
    resolver: zodResolver(CreateGameSchema),
    defaultValues: { releaseDate: todayISO },
  });

  const onSubmit = handleSubmit(async (data) => {
    await gameService.create(data);
    reset({ releaseDate: todayISO });
    onSuccess();
  });

  const genres = genreState.status === "success" ? genreState.data : [];

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
          <i className="pi pi-plus text-purple-600 text-sm" />
        </div>
        <h2 className="text-base font-semibold text-gray-800">Agregar Juego</h2>
      </div>

      <div className="px-6 py-5">
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Título
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    placeholder="Ej. Doom Eternal"
                    invalid={!!errors.title}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              />
              {errors.title && (
                <small className="text-red-500 text-xs">
                  {String(errors.title.message)}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Género
              </label>
              <Controller
                name="genreId"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={genres}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Selecciona un género"
                    loading={genreState.status === "loading"}
                    invalid={!!errors.genreId}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              />
              {errors.genreId && (
                <small className="text-red-500 text-xs">
                  {String(errors.genreId.message)}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Precio
              </label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    value={typeof field.value === "number" ? field.value : null}
                    onValueChange={(e) => field.onChange(e.value)}
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    minFractionDigits={2}
                    placeholder="59.99"
                    invalid={!!errors.price}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              />
              {errors.price && (
                <small className="text-red-500 text-xs">
                  {String(errors.price.message)}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Fecha de Lanzamiento
              </label>
              <Controller
                name="releaseDate"
                control={control}
                render={({ field }) => (
                  <Calendar
                    value={field.value ? new Date(field.value) : null}
                    onChange={(e) => {
                      if (e.value instanceof Date) {
                        const d = e.value;
                        field.onChange(
                          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
                        );
                      } else field.onChange("");
                    }}
                    dateFormat="dd/mm/yy"
                    showIcon
                    invalid={!!errors.releaseDate}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              />
              {errors.releaseDate && (
                <small className="text-red-500 text-xs">
                  {String(errors.releaseDate.message)}
                </small>
              )}
            </div>
          </div>

          <Button
            type="submit"
            label={isSubmitting ? "Guardando..." : "Agregar Juego"}
            icon="pi pi-save"
            severity="success"
            loading={isSubmitting}
            className="w-full sm:w-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all"
          />
        </form>
      </div>
    </section>
  );
}
