export type AsyncState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; message: string }

export type PaginatedResult<T> = {
    items: T[]
    total: number
    page: number
    pageSize: number
}