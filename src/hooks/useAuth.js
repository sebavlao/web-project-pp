import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { API_USER } from "../api/api"

export const useAuth = () => {
    const auth = useContext(AuthContext)

    const login = async form => {
        try {
            const res = await API_USER.post("/", form)
            localStorage.setItem("x-access-token", res.data.token)
            return {success: true, role: res.data.role}
        } catch (err) {
            return {success: false, error: err}
        }
    }

    const logout = () => {
        localStorage.removeItem("x-access-token")
    }

    return { login, logout, auth }
}