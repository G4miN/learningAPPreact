export type Game = {
    idGame: number
    title: string
    genreId: number
    price: number
    releaseDate: string
}

export type CreateGamePayload = Omit<Game, "idGame">
export type UpdateGamePayload = Game