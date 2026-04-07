
//const BASE_URL = "https://gamefactoryapiym.azurewebsites.net";
const BASE_URL = "https://localhost:7273";

const parseJsonIfPresent = async <T>(res: Response): Promise<T> => {
    if (res.status === 204) return undefined as T

    const contentType = res.headers.get("content-type") ?? ""
    if (!contentType.includes("application/json")) return undefined as T

    const text = await res.text()
    if (!text.trim()) return undefined as T

    return JSON.parse(text) as T
}

const apiClient = {
    get: async <T>(endpoint: string): Promise<T> => {
        return fetch(`${BASE_URL}${endpoint}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
                return res.json()
            })
    },

    post: async <T>(endpoint: string, body: unknown): Promise<T> => {
        return fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then(async (res) => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)

            return parseJsonIfPresent<T>(res)
        })
    },

    put: async <T>(endpoint: string, body: unknown): Promise<T> => {
        return fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then(async (res) => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
            return parseJsonIfPresent<T>(res)
        })
    },

    delete: async (endpoint: string): Promise<void> => {
        return fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
        }).then((res) => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
        })
    },
}

export default apiClient