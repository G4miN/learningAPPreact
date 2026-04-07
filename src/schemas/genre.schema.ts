import { z } from "zod";

export const CreateGenreSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
})

export const UpdateGenreSchema = z.object({
    idGenre: z.number().min(1, "El ID del género es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
})

export type CreateGenrePayload = z.infer<typeof CreateGenreSchema>
export type UpdateGenrePayload = z.infer<typeof UpdateGenreSchema>