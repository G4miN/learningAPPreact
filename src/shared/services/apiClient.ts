
//const BASE_URL = "https://gamefactoryapiym.azurewebsites.net";
const BASE_URL = "https://localhost:7273";

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

            if (res.status === 204) return undefined as T;

            const contentType = res.headers.get("content-type") ?? "";
            if (!contentType.includes("application/json")) return undefined as T;

            return (await res.json()) as T;
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