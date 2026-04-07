import { useState, useEffect } from "react"
import type { Game } from "../../../types/game.types"
import type { AsyncState } from "../../../types/common.types"
import gameService from "../services/game.service"

export function useGames() {
    const [refreshKey, setRefreshKey] = useState(0)
    const [state, setState] = useState<AsyncState<Game[]>>({ status: "loading" })

    useEffect(() => {
        gameService.getAll()
            .then(data => setState({ status: "success", data }))
            .catch(err => setState({ status: "error", message: err.message }))
    }, [refreshKey])
    const refresh = () => setRefreshKey(prev => prev + 1)

    return { state, refresh }
}
