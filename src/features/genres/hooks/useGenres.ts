import { useState, useEffect } from "react"
import type { AsyncState } from "../../../types/common.types"
import type { Genre } from "../../../types/genre.types"
import genreService from "../services/genre.service"

export function useGenres() {
    const [refreshKey, setRefreshKey] = useState(0)
    const [state, setState] = useState<AsyncState<Genre[]>>({ status: "loading" })

    useEffect(() => {
        genreService.getAll()
            .then(data => setState({ status: "success", data }))
            .catch(err => setState({ status: "error", message: err.message }))
    }, [refreshKey])
    const refresh = () => setRefreshKey(prev => prev + 1)

    return { state, refresh }
}
