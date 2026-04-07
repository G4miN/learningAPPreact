import { z } from "zod"

export const CreateGameSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    genreId: z.coerce.number().min(1, "El género es requerido"),
    price: z.coerce.number().min(0, "El precio debe ser un número positivo"),
    releaseDate: z.string().min(1, "La fecha de lanzamiento es requerida")
})

export const UpdateGameSchema = z.object({
    idGame: z.number().min(1, "El ID del juego es requerido"),
    title: z.string().min(1, "El título es requerido"),
    genreId: z.coerce.number().min(1, "El género es requerido"),
    price: z.coerce.number().min(0, "El precio debe ser un número positivo"),
    releaseDate: z.string().min(1, "La fecha de lanzamiento es requerida")
})

export type CreateGamePayload = z.infer<typeof CreateGameSchema>
export type UpdateGamePayload = z.infer<typeof UpdateGameSchema>