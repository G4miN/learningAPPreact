
const BASE_URL = "https://gamefactoryapiym.azurewebsites.net";

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
        }).then((res) => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
            return res.json()
        })
    },

    put: async <T>(endpoint: string, body: unknown): Promise<T> => {
        return fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then((res) => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
            return res.json()
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