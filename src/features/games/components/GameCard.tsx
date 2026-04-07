import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { z } from "zod";
import { UpdateGameSchema } from "../../../schemas/game.schema";
import gameService from "../services/game.service";
import { useGenres } from "../../genres/hooks/useGenres";
import type { Game } from "../../../types/game.types";

type Props = { game: Game; onRefresh: () => void };
type UpdateIn = z.input<typeof UpdateGameSchema>;
type UpdateOut = z.output<typeof UpdateGameSchema>;

export default function GameCard({ game, onRefresh }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { state: genreState } = useGenres();

  const formattedDate = new Date(game.releaseDate).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateIn, unknown, UpdateOut>({
    resolver: zodResolver(UpdateGameSchema),
    defaultValues: {
      idGame: game.idGame,
      title: game.title,
      price: game.price,
      releaseDate: game.releaseDate,
    },
  });

  const onUpdate = handleSubmit(async (data) => {
    await gameService.update(data);
    setEditOpen(false);
    onRefresh();
  });

  const handleDelete = () => setDeleteOpen(true);

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await gameService.delete(game.idGame);
      setDeleteOpen(false);
      onRefresh();
    } finally {
      setIsDeleting(false);
    }
  };

  const genres = genreState.status === "success" ? genreState.data : [];

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div className="h-1 bg-linear-to-r from-purple-600 to-violet-400" />
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3 className="font-semibold text-gray-800 text-base leading-snug">
              {game.title}
            </h3>
            <span className="shrink-0 text-sm font-bold text-purple-700 bg-purple-50 border border-purple-200 rounded-lg px-2.5 py-0.5">
              ${game.price.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-100 mb-3" />
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Género</span>
              <span className="font-medium text-gray-700">{game.genre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Lanzamiento</span>
              <span className="font-medium text-gray-700">{formattedDate}</span>
            </div>
          </div>
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            <Button
              label="Editar"
              icon="pi pi-pencil"
              size="small"
              outlined
              severity="secondary"
              className="flex-1 rounded-full! px-4! py-2.5! bg-white! text-slate-700! border-slate-300! hover:bg-slate-100!"
              onClick={() => setEditOpen(true)}
            />
            <Button
              label="Eliminar"
              icon="pi pi-trash"
              size="small"
              outlined
              severity="danger"
              className="flex-1 rounded-full! px-4! py-2.5! bg-rose-50! text-rose-700! border-rose-200! hover:bg-rose-100!"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>

      <Dialog
        header={`Editar: ${game.title}`}
        visible={editOpen}
        onHide={() => setEditOpen(false)}
        className="w-[min(92vw,560px)] overflow-hidden rounded-2xl"
        breakpoints={{ "960px": "75vw", "640px": "96vw" }}
        modal
        draggable={false}
        headerClassName="bg-gradient-to-r from-violet-700 to-fuchsia-600 text-white !px-5 !py-4"
        contentClassName="bg-slate-50 !px-5 !pt-5 !pb-4"
      >
        <form onSubmit={onUpdate} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Título
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    className="w-full"
                    invalid={!!errors.title}
                  />
                )}
              />
              {errors.title && (
                <small className="text-red-500 text-xs font-medium">
                  {String(errors.title.message)}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
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
                    className="w-full"
                  />
                )}
              />
              {errors.genreId && (
                <small className="text-red-500 text-xs font-medium">
                  {String(errors.genreId.message)}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
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
                    invalid={!!errors.price}
                    className="w-full"
                  />
                )}
              />
              {errors.price && (
                <small className="text-red-500 text-xs font-medium">
                  {String(errors.price.message)}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
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
                    className="w-full"
                  />
                )}
              />
              {errors.releaseDate && (
                <small className="text-red-500 text-xs font-medium">
                  {String(errors.releaseDate.message)}
                </small>
              )}
            </div>
          </div>

          <div className="mt-1 flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              label="Cancelar"
              severity="secondary"
              outlined
              onClick={() => setEditOpen(false)}
              className="w-full sm:w-auto rounded-full! px-5! py-2.5! bg-white! text-slate-700! border-slate-300! hover:bg-slate-100!"
            />
            <Button
              type="submit"
              label={isSubmitting ? "Guardando..." : "Guardar cambios"}
              icon="pi pi-save"
              loading={isSubmitting}
              className="w-full sm:w-auto rounded-full! px-5! py-2.5! border-0! text-white! font-semibold! shadow-sm! bg-linear-to-r from-violet-700 to-fuchsia-600 hover:from-violet-800 hover:to-fuchsia-700"
            />
          </div>
        </form>
      </Dialog>

      <Dialog
        header="Confirmar eliminación"
        visible={deleteOpen}
        onHide={() => !isDeleting && setDeleteOpen(false)}
        className="w-[min(92vw,420px)] overflow-hidden rounded-2xl"
        breakpoints={{ "640px": "96vw" }}
        modal
        draggable={false}
        closable={!isDeleting}
        headerClassName="bg-gradient-to-r from-rose-700 to-red-600 text-white !px-5 !py-4"
        contentClassName="bg-slate-50 !px-5 !pt-5 !pb-4"
      >
        <div className="flex items-start gap-3 text-slate-700">
          <span className="pi pi-exclamation-triangle mt-0.5 text-xl text-rose-600" />
          <p className="text-base leading-6">¿Eliminar "{game.title}"?</p>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            label="Cancelar"
            outlined
            severity="secondary"
            disabled={isDeleting}
            onClick={() => setDeleteOpen(false)}
            className="w-full sm:w-auto rounded-full! px-5! py-2.5! bg-white! text-slate-700! border-slate-300! hover:bg-slate-100!"
          />
          <Button
            type="button"
            label={isDeleting ? "Eliminando..." : "Eliminar"}
            icon="pi pi-trash"
            loading={isDeleting}
            onClick={confirmDelete}
            className="w-full sm:w-auto rounded-full! px-5! py-2.5! border-0! text-white! font-semibold! shadow-sm! bg-linear-to-r from-rose-700 to-red-600 hover:from-rose-800 hover:to-red-700"
          />
        </div>
      </Dialog>
    </>
  );
}
