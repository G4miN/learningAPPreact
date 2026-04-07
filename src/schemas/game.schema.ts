import { z } from "zod"

const requiredText = (message: string) =>
    z.any()
        .transform((value) => (typeof value === "string" ? value.trim() : ""))
        .refine((value) => value.length > 0, message)

const requiredNumber = (message: string) =>
    z.any()
        .transform((value) => {
            if (value === "" || value === null || value === undefined) return NaN
            if (typeof value === "number") return value
            if (typeof value === "string") return Number(value)
            return NaN
        })
        .refine((value) => Number.isFinite(value), message)

const nonNegativeNumber = (requiredMessage: string, minMessage: string) =>
    requiredNumber(requiredMessage).refine((value) => value >= 0, minMessage)

export const CreateGameSchema = z.object({
    title: requiredText("El título es requerido"),
    genreId: requiredNumber("El género es requerido").refine((value) => value >= 1, "El género es requerido"),
    price: nonNegativeNumber("El precio es requerido", "El precio debe ser un número positivo"),
    releaseDate: requiredText("La fecha de lanzamiento es requerida")
})

export const UpdateGameSchema = z.object({
    idGame: z.number().min(1, "El ID del juego es requerido"),
    title: requiredText("El título es requerido"),
    genreId: requiredNumber("El género es requerido").refine((value) => value >= 1, "El género es requerido"),
    price: nonNegativeNumber("El precio es requerido", "El precio debe ser un número positivo"),
    releaseDate: requiredText("La fecha de lanzamiento es requerida")
})

export type CreateGamePayload = z.infer<typeof CreateGameSchema>
export type UpdateGamePayload = z.infer<typeof UpdateGameSchema>