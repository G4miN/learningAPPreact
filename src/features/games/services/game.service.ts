import type { CreateGamePayload, UpdateGamePayload } from "../../../schemas/game.schema"
import apiClient from "../../../shared/services/apiClient"
import type { Game } from "../../../types/game.types"
const END_POINT = "/api/Game"

const gameService = {
    getAll: () => apiClient.get<Game[]>(END_POINT),
    getById: (id: number) => apiClient.get<Game>(`${END_POINT}?id=${id}`),
    create: (payload: CreateGamePayload) => apiClient.post<void>(END_POINT, payload),
    update: (payload: UpdateGamePayload) => apiClient.put<void>(END_POINT, payload),
    delete: (id: number) => apiClient.delete(`${END_POINT}?id=${id}`)
}

export default gameService