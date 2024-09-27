import { API_USER } from "../api/api"

export const registerService = async form => {
    try {
        const res = await API_USER.post("/signup", form)
        return {success: true, data: res.data}
    } catch (err) {
        return {success: false, error: err}
    }
}