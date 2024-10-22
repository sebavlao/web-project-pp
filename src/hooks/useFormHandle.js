import { useEffect, useState } from "react"

export const useFormHandle = (initialValues = [], userType = null) => {
    const [form, setForm] = useState(initialValues.reduce((acc, cur) => {
        acc[cur] = ""
        return acc
    }, {} ))
    const [isLoading, setIsLoading] = useState(false)
    const [buttonStateDisabled, setButtonStateDisabled] = useState(false)

    useEffect(() => {
        if (isLoading) {
            return setButtonStateDisabled(true)
        }

        setButtonStateDisabled(false)
    }, [isLoading])


    useEffect(() => {
        if (userType) {
            setForm({
                ...form,
                ["userType"]: userType
            })
        }
    }, [userType])

    const inputsHandle = input => {
        const field = input.target.name
        const value = input.target.value

        setForm({
            ...form,
            [field]: value
        })
    }

    return {form, inputsHandle, buttonStateDisabled, setIsLoading}
}