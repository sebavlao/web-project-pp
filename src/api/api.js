import axios from "axios"

export const API_JOBS = axios.create({
    baseURL: "http://localhost:5120/api/jobs"
})
export const API_USER = axios.create({
    baseURL: "http://localhost:5120/api/user"
})
export const API_PUBLIC = axios.create({
    baseURL: "http://localhost:5120/api"
})