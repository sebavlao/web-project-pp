import { API_USER } from "../api/api"
import { useState } from "react"

export const useLogin = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    })

    const [buttonState, setButtonState] = useState(false)

    const inputsHandle = input => {
        const field = input.target.name
        const value = input.target.value

        setForm({
            ...form,
            [field]: value
        })
    }

    const sendLogin = async () => {
        try {
            const res = await API_USER.post("/", form)
            return {success: true, data: res.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }

    return { buttonState, setButtonState, sendLogin, inputsHandle}
}