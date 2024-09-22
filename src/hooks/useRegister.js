import { useState } from "react"
import { API_USER } from "../api/api"

export const useRegister = (userType = null) => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        userType: userType,
        name: "",
        surname: "",
        birthdate: "",
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

    const sendRegister = async () => {
        try {
            const res = await API_USER.post("/signup", form)
            return {success: true, data: res.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }

    return { buttonState, setButtonState, sendRegister, inputsHandle}
}