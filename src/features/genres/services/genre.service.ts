import type { CreateGenrePayload, UpdateGenrePayload } from "../../../schemas/genre.schema"
import apiClient from "../../../shared/services/apiClient"
import type { Genre } from "../../../types/genre.types"
const END_POINT = "/api/Genre"

const genreService = {
    getAll: () => apiClient.get<Genre[]>(END_POINT),
    getById: (id: number) => apiClient.get<Genre>(`${END_POINT}?id=${id}`),
    create: (payload: CreateGenrePayload) => apiClient.post<void>(END_POINT, payload),
    update: (payload: UpdateGenrePayload) => apiClient.put<void>(END_POINT, payload),
    delete: (id: number) => apiClient.delete(`${END_POINT}?id=${id}`)
}

export default genreService