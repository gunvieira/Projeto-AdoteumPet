import axios, { type AxiosInstance } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
    throw new Error("A variável de ambiente VITE_API_URL não está definida no arquivo .env");
}

const api: AxiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;