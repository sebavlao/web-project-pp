import axios from "axios"
import { useAccessToken } from "../hooks/useAccessToken"

const { getToken } = useAccessToken();

export const API_JOBS = axios.create({
    baseURL: "https://worklink.com.ar/api/jobs",
    headers: {
        'x-access-token': getToken()
    }
})
export const API_USER = axios.create({
    baseURL: "https://worklink.com.ar/api/user"
})
export const API_PUBLIC = axios.create({
    baseURL: "https://worklink.com.ar/api"
})
export const API_CURRENT_USER = axios.create({
    baseURL: "https://worklink.com.ar/api/user/me",
    headers: {
        'x-access-token': getToken()
    }
})
